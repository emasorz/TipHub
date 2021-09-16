const mongoose = require("mongoose");

const productPostSchema = new mongoose.Schema({
    title: { type: String, required: false, minlenght: 1, trim: true },
    summary: { type: String, required: false, minlenght: 1, trim: true },
    linkSocial: { type: [String], required: false },
    description: { type: String, required: false, minlenght: 1 },
    customFilter: { type: Array, required: false },
    isADraft: { type: Boolean, required: true, minlenght: 1, trim: true, default: true },
    _userId: { type: mongoose.Types.ObjectId, required: true },
    img: { type: String, required: false, minlenght: 1, trim: true }
})

const ProductPost = mongoose.model('productPost', productPostSchema);

module.exports = {
    ProductPost
}