const express = require('express'),
  router = express.Router();

const ProductsController = require('../controllers/ProductsController');

router.post('/products', ProductsController.createProduct);
router.get('/products', ProductsController.getAllProducts);
router.get('/products/:id', ProductsController.getProduct);
router.patch('/products/:id', ProductsController.editProduct);
router.delete('/products/:id', ProductsController.deleteProduct);

module.exports = router;
