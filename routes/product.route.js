const { Router } = require("express")
const Product = require("../modules/product")
const User = require("../modules/user")
const  jwt = require("jsonwebtoken")

const router = Router();

// /api/product/cart
router.get("/cart", function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return  res.status(401).json({ message: "Нет авторизации"})
        }
        req.user = jwt.verify(token,"Sample Text")
        next()
    }
    catch (e) {
        res.status(401).json({ message: "Нет авторизации по токену"})
    }
}, async (req, res) =>{
    try {
        const user = await User.findById(req.user.userId)
        return res.json(user.cart)
    } catch (e) {
       return  res.status(500).json( {message: "Ошибка"})
    }
})

// /api/product/
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        return res.json(products)
    }
    catch (e) {
        return  res.status(500).json( {message: "Ошибка"})
    }
})
module.exports = router
