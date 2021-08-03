const express = require("express");
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))

app.use("/api/auth",require("./routes/auth.route"))

app.use("/api/product", require("./routes/product.route"))

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect("mongodb+srv://admin:EFh91M11qgkSjk3N@cluster0.klqk9.mongodb.net/test?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            })
        app.listen(PORT, () => console.log("Started"))
    } catch (e) {
        process.exit(1)
    }

}
start()
