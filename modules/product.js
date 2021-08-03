const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
})

module.exports = model("Product", schema)
