const Joi = require('joi');
const { number } = require('joi');



module.exports.productSchema = Joi.object({
    product: Joi.object({
        productName: Joi.string().required(),
        productPrice: Joi.number().required().min(0),
    }).required()
});