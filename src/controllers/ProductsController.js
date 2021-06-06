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
 *        description: 'Product created successfully'
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
    imageFile: Joi.string().optional(),
  });

  try {
    let productValues = await schema.validateAsync(req.fields);

    if (req.files && req.files.imageFile) {
      const imagePath = req.files.imageFile.path;
      const imageName = path.basename(imagePath);
      productValues = {
        ...productValues,
        image: imageName,
      };
    }

    const product = await Product.create(productValues);
    res.status(201).json(product);
  } catch (err) {
    if (err.details) { // body validation error
      res.status(422).json({
        errors: err.details,
      });
    } else {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

/**
 * Get all products
 * @swagger
 * /api/products:
 *  get:
 *    tags:
 *      - Products
 *    summary: Get all products
 *    responses:
 *      '200':
 *        description: 'Success'
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: 'Array of products'
 *              items:
 *                $ref: '#/components/schemas/Product'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/**
 * Get a single product
 * @swagger
 * /api/products/{id}:
 *  get:
 *    tags:
 *      - Products
 *    summary: Get a single product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: 'ID of the product to get'
 *    responses:
 *      '200':
 *        description: 'Success'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      '404':
 *        description: 'The requested product cannot be found'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 */
const getProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (Number.isNaN(productId)) return res.status(404).end();

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).end();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/**
 * Edit a product
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    tags:
 *      - Products
 *    summary: Edit a product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: 'ID of the product to edit'
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      '200':
 *        description: 'Product edited successfully'
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      '404':
 *        description: 'The requested product cannot be found'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 */
const editProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    price: Joi.number().precision(2).optional(),
    imageFile: Joi.string().optional(),
  });

  try {
    const productId = parseInt(req.params.id, 10);
    if (Number.isNaN(productId)) return res.status(404).end();

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).end();

    let newProductValues = await schema.validateAsync(req.fields);

    if (req.files && req.files.imageFile) {
      const imagePath = req.files.imageFile.path;
      const imageName = path.basename(imagePath);
      newProductValues = {
        ...newProductValues,
        image: imageName,
      };
    }

    Object.keys(newProductValues).forEach((key) => {
      product[key] = newProductValues[key];
    });

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    if (err.details) { // body validation error
      res.status(422).json({
        errors: err.details,
      });
    } else {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

/**
 * Delete a product
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    tags:
 *      - Products
 *    summary: Delete a product
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: 'ID of the product to delete'
 *    responses:
 *      '204':
 *        description: 'Product deleted successfully'
 *      '404':
 *        description: 'The requested product cannot be found'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 */
const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (Number.isNaN(productId)) return res.status(404).end();

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).end();

    await product.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct,
};
