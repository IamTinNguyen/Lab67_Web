const Product = require("../models/products");
const { productSchema } = require("../schemas.js");

module.exports.index = async(req, res) => {
    const products = await Product.find({});
    res.render("files/index", { products });
};

module.exports.addProduct = async(req, res, next) => {
    const product = new Product(req.body.product);
    await product.save();
    req.flash("success", "Successfully made a new product!");
    res.redirect(`/products/${product._id}`);
};

module.exports.updateProduct = async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {...req.body.product });
    req.flash("success", "Successfully updated product!");
    res.redirect(`/products/${product._id}`);
};