//da gestire lato client

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId, required: true },
    quantity: { type: Number, required: true }
})

const CartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = {
    CartItem
}