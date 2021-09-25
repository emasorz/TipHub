const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    owner: { type: String, required: true, minlenght: 1, trim: true },
    country: { type: String, required: true, minlenght: 1, trim: true },
    city: { type: String, required: true, minlenght: 1, trim: true },
    zipCode: { type: String, required: true, minlenght: 1, trim: true },
    street: { type: String, required: true, minlenght: 1, trim: true },
    _userId: { type: mongoose.Types.ObjectId, required: true },
    type: { type: String, required: false, minlenght: 1, trim: true, default:null },
    def: {type:Boolean, required:false, default:false},
    civ: {type:String, required:true, trim:true, minlenght:1},
    int:{type:String, required:true, trim:true, minlenght:1},
    phone:{type:Number, required:false, default:null},
    indications_info:{type:String, require:false, default:null}
})

const Address = mongoose.model('address', addressSchema);

module.exports = {
    Address
}