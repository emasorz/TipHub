const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
    socialId: { type: String, required: true, minlenght: 1, trim: true },
    followers: { type: Number, minlenght: 1, trim: true },
    name: { type: String, required: true, minlenght: 1, trim: true },
    nickName: { type: String, required: true, minlenght: 1, trim: true },
    _userId: { type: mongoose.Types.ObjectId, required: true },
})

const Social = mongoose.model('social', socialSchema);

module.exports = {
    Social
}