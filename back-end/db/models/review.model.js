const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true, minlenght: 1, trim: true },
    stars: { type: Number, required: true, minlenght: 1, trim: true },
    content: { type: String, required: true, minlenght: 1, trim: true },
    date: { type: String, required: true, minlenght: 1, trim: true },
    verified: { type: Boolean, required: true, minlenght: 1, trim: true },
})

const Review = mongoose.model('review', reviewSchema);

module.exports = {
    Review
}