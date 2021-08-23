const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    date: { type: String, required: true, minlenght: 1, trim: true },
    buyerId: { type: String, required: true, minlenght: 1, trim: true },
    total: { type: Number, required: true, minlenght: 1, trim: true },
    status: { type: Number, required: true, minlenght: 1, trim: true }
})

const Order = mongoose.model('order', orderSchema);

module.exports = {
    Order
}