const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
    owner: { type: String, required: true, minlength: 1, trim: true },
    number:{type:Number, required: true, minlength:16},
    cvc: {type:Number, required:true, minlength: 3},
    MM: {type:Number,required:true, minlength:2},
    YY:{type:Number,required:true, minlength:2},
    _userId: { type: mongoose.Types.ObjectId, required: true },
})

const PaymentMethod = mongoose.model('paymentMethod', paymentMethodSchema);

module.exports = {
    PaymentMethod
}

//todo obfuscate methods