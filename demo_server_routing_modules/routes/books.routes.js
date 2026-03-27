const router = require("express").Router(); // Objeto de rutas

// IMPORT
// booksController -> {createBooks,getBook,editBook, deleteBook}
const booksController = require("../controllers/books.controller"); // controladores de books

// GET http://localhost:3000/books/Harry Potter ---> /:title
// GET http://localhost:3000/books/1985 ---> /:title
// GET http://localhost:3000/books ---> {/:title}

router.get("{/:title}", booksController.getBook);

// para refrescar servidor
//node --watch app.js

// POST http://localhost:3000/books
/* 
  BODY:
        {
          "title": "Don Quijote 2: El regreso del Hidalgo",
          "author": "Cervantes",
          "year": 1967
        } 
    */
router.post("/", booksController.createBook);

// PUT http://localhost:3000/books
/* 
  BODY:
  Ejemplo 1 - Cambiar todo
        {
          "title": "Cien años de soledad",
          "new_title": "Don Quijote 3: La ínsula de Sancho Panza",
          "author": "Cervantes",
          "year": 1967
        } 
  
  Ejemplo 2 - Cambiar año
        {
          "title": "Cien años de soledad",
          "year": 1967
        } 
  
  Ejemplo 3 - Cambiar autor
        {
          "title": "Cien años de soledad",
          "author": "Miguel de Cervantes"
        } 
    */
router.put("/", booksController.editBook);

// DELETE http://localhost:3000/books/Harry Potter ---> /:title
// DELETE http://localhost:3000/books/1985 ---> /:title
// DELETE http://localhost:3000/books/ ---> [] -> Borra TODOS los libros
router.delete("{/:title}", booksController.deleteBook);

// EXPORTA EL ROUTER
module.exports = router;

