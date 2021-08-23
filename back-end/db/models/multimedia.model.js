const mongoose = require("mongoose");

const multimediaSchema = new mongoose.Schema({
    type: { type: String, required: true, minlenght: 1, trim: true },
    multimediaFile: { type: Number, minlenght: 1, trim: true },
    description: { type: String, required: true, minlenght: 1, }
})

const Multimedia = mongoose.model('multimedia', multimediaSchema);

module.exports = {
    Multimedia
}