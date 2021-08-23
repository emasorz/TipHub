//file for load all mongoose models in one 

const { Test } = require("./test.model");
const { User } = require("./user.model");
const { Product } = require("./product.model");
const { Order } = require("./order.model");
const { Review } = require("./review.model");
const { ProductPost } = require("./productPost.model");
const { Address } = require("./address.model");
const { Multimedia } = require("./multimedia.model");
const { Social } = require("./social.model");
const { CartItem } = require("./cartItem.model");
const { VariantsOption } = require('./variantsOption.model')

module.exports = {
    Test,
    User,
    Product,
    Address,
    CartItem,
    Multimedia,
    Social,
    ProductPost,
    Review,
    Order,
    VariantsOption
}