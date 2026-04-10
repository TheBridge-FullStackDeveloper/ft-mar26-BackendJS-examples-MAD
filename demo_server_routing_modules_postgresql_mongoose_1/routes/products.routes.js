const productsController = require('../controllers/products.controller');
const router = require('express').Router();

// GET
// http://localhost:3000/2
// http://localhost:3000/3
// http://localhost:3000/8
router.get("{/:id}", productsController.getProduct);

// POST
router.post("/", productsController.createProduct);

// POST http://localhost:3000/api/products
/* {
    "id": 6,
    "title": "Zumo de naranja",
    "price": 1.80,
    "description": "Cafe jugosa del teatro",
    "image":"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
} 
    */

module.exports = router;