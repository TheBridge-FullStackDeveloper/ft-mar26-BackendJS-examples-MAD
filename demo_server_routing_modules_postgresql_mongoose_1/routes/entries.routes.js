const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router.get('/', entriesController.getEntries);
// GET http://localhost:3000/api/entries/5 --> paginación
// router.get('/:page', entriesController.getEntriesByPage);
router.post('/', entriesController.createEntry);
router.put('/', entriesController.updateEntry);

module.exports = router;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */

// PUT http://localhost:3000/api/entries
/*
{
    "new_title":"Hemos venido a bailar",
    "title": "Hemos venido a jugar",
    "content": "Corren rumores de que hay presentación de SQL",
    "email": "albertu@thebridgeschool.es",
    "category": "sucesos"
}
    */