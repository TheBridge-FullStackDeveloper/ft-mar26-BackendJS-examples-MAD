const express = require("express"); // Importando express
const app = express(); // Crear el objeto servidor
const port = 3000; // Elegir puerto HTTP

// En el futuro será mi "base de datos"
const books = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { title: "El señor de los anillos", author: "J.R.R. Tolkien", year: 1954 },
  { title: "El principito", author: "Antoine de Saint-Exupéry", year: 1943 },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
  },
  { title: "Moby Dick", author: "Herman Melville", year: 1851 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { title: "1984", author: "George Orwell", year: 1949 },
];

app.get("/", (req, res) => {
  // ruta/endpoint 1
  res.send("Hello World!");
});

app.get("/hola", (req, res) => {
  // ruta/endpoint 2
  res.send("Hello World 2!");
});

app.get("/adios", (req, res) => {
  // ruta/endpoint 3
  res.send("Bye World!");
});

// http://localhost:3000/books/Harry Potter ---> /:title
// http://localhost:3000/books/1985 ---> /:title
// http://localhost:3000/books ---> {/:title}

app.get("/books{/:title}", (req, res) => {
    console.log(req.params.title);
    const title = req.params.title;
    if(title){
        const book = books.find(book => book.title === title);
        
        if(book){
            res.status(200).json(book); // devuelve el libro encontradoodfdff
        }
        else {
            res.status(404).json({msj:"Libro no encontrado"});
        }
    }
    else{
        res.status(200).json(books); // devuelve todos los libros
    }
  });

  // para refrescar servidor
  //node --watch app.js

// POST http://localhost:3000/books
app.post("/books", (req, res) => {
    res.send("Libro creado!");
});

// PUT http://localhost:3000/books
app.put("/books", (req, res) => {
    res.send("Libro editado!");
});

// DELETE http://localhost:3000/books
app.delete("/books", (req, res) => {
    res.send("Libro borrado!");
});



// http://localhost:3000
app.listen(port, () => {
  // activar servidor en puerto 3000
  console.log(`Example app listening on port ${port}`);
});
