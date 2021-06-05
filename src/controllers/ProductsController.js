const Joi = require('joi');
const path = require('path');
const Product = require('../db/models/Product');

/**
 * Create a product
 * @swagger
 * /api/products:
 *  post:
 *    tags:
 *      - Products
 *    summary: Create a product
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      '201':
 *        description: 'Product successfully created'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 */
const createProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    imageFile: Joi.string().optional()
  });

  try {
    let productValues = await schema.validateAsync(req.fields);

    if (req.files && req.files.imageFile) {
      const imagePath = req.files.imageFile.path,
        imageName = path.basename(imagePath);
      productValues = {
        ...productValues,
        image: imageName
      }
    }

    const product = await Product.create(productValues);
    res.status(201).json(product);
  } catch (err) {
    console.error('validation error', err);
    if (err.details) {
      res.status(422).json({
        errors: err.details
      });
    } else {
      res.status(500).json({
        error: err.message
      });
    }
  }

}

module.exports = {
  createProduct
}
