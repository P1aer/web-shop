const { Router } = require("express")
const User = require("../modules/user")
const { check, validationResult } = require("express-validator")
const  jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = Router();

// /api/auth/register
router.post("/register", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Некорректный пароль").isLength({ min: 5})
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные"
            })
        }
        const { email, password } = req.body
        const check = await User.findOne({ email })
        if (check) {
            res.status(400).json({ message: "пользователь уже существует" })
            return
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User ({ email, password: hashPassword })
        await  user.save()
        res.status(201).json({ message: "пользователь создан"})
    } catch (e) {
        res.status(500).json({ message: "Ошибка" })
    }
})

// /api/auth/login
router.post("/login", [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Некорректный пароль").exists()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные"
            })
        }
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Пользователя не существует"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Пароль не подходит"})
        }
        const token = jwt.sign(
        { userId: user.id },
        "Sample Text",
            { expiresIn: "1hr" }
        )
        res.json( { token, userId: user.id })
    } catch (e) {
        res.status(500).json({ message: "Ошибка" })
    }
})


module.exports = router
