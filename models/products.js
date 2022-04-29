const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: String,
    productPrice: Number,
    productImg: String,
    productDesc: String
});

module.exports = mongoose.model("Product", productSchema);