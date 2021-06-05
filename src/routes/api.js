const express = require('express'),
  router = express.Router();

const ProductsController = require('../controllers/ProductsController');

router.get('/products',
ProductsController.createProduct);

router.post('/products', ProductsController.createProduct);

module.exports = router;
