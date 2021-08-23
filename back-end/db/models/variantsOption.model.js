const mongoose = require("mongoose");

const variantsOptionSchema = new mongoose.Schema({
    _userId: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    options: { type: [String], required: true }
})

const VariantsOption = mongoose.model('variantsOption', variantsOptionSchema);

module.exports = {
    VariantsOption
}