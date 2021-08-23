const mongoose = require("mongoose");
const { VariantsOption } = require("./variantsOption.model");

const productSchema = new mongoose.Schema({
    price: { type: String, required: true, minlenght: 1, trim: true },
    thingsCategory: { type: [String], required: false, minlenght: 1, trim: true },
    quantity: { type: String, required: true, minlenght: 1, trim: true },
    img: { type: String, required: true, minlenght: 1 },
    _productpostId: { type: mongoose.Types.ObjectId, required: true },
    _userId: { type: mongoose.Types.ObjectId, required: true },
})

const Product = mongoose.model('product', productSchema);

module.exports = {
    Product
}