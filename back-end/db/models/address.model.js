const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    country: { type: String, required: true, minlenght: 1, trim: true },
    city: { type: String, required: true, minlenght: 1, trim: true },
    zipCode: { type: String, required: true, minlenght: 1, trim: true },
    street: { type: String, required: true, minlenght: 1, trim: true },
    CAP: { type: Number, required: true, minlenght: 1, trim: true },
    _userId: { type: mongoose.Types.ObjectId, required: true },
    type: { type: String, required: true, minlenght: 1, trim: true }
})

const Address = mongoose.model('address', addressSchema);

module.exports = {
    Address
}