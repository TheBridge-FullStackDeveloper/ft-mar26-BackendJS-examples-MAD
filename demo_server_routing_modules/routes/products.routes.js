const productsController = require('../controllers/products.controller');
const router = require('express').Router();

// GET
// http://localhost:3000/2
// http://localhost:3000/3
// http://localhost:3000/8
router.get("{/:id}", productsController.getProduct);

// POST
router.post("/", productsController.createProduct);


module.exports = router;