const Joi = require('joi');

exports.orderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().integer().positive().required(),
    })
  ).required(),
});