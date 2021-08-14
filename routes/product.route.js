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
        const temp =  await User.findById(req.user.userId).populate('cart.location')
        return res.json(temp.cart)
    } catch (e) {
       return  res.status(500).json( {message: "Ошибка"})
    }
})

// /api/product/addCart
router.post("/addCart", function (req, res, next) {
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
}, async (req, res) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user.userId)
        const id = user.cart.findIndex((elem) => {
            return elem.location == productId
        })
        if (id !== -1) {
            const temp = [...user.cart]
            temp[id].amount ++ ;
            await user.updateOne({ cart: temp })
        }
        else await user.updateOne({ cart: [...user.cart, {location:productId, amount: 1}] })
        return  res.status(200).json( {message: `Товар ${productId} Добавлен`})
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
router.put("/change", async (req, res) => {
    try {
        const { product, value, userId } = req.body
        const user = await User.findById(userId)
        const temp = [...user.cart]
        for (let i = 0; i< temp.length; i++) {
            if( temp[i].location == product) {
                value > 0 ? temp[i].amount = value
                    : temp.splice(i,1)
            }
        }
        await user.updateOne({cart: temp})
        return  res.status(200).json( {message: `Товар ${product} Изменен`})
    }
    catch (e) {
        return  res.status(500).json( {message: "Ошибка"})
    }
})
module.exports = router
