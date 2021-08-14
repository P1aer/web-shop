const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{location: {type: Types.ObjectId, ref: "Product"} , amount: {type: Number }} ]
})

module.exports = model("User", schema)
