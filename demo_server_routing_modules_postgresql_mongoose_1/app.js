const express = require("express"); // Importando express
const helmet = require("helmet"); // Seguridad HTTP
const app = express(); // Crear el objeto servidor
const port = 3000; // Elegir puerto HTTP

// Habilitar recepción de JSON por mi backend
// Parsear el "body" entrante a JSON
// Middleware (operación intermedia)
app.use(express.json());

// Habilitar Helmet para seguridad HTTP
app.use(helmet());

// IMPORTAR Rutas
const booksRoutes = require('./routes/books.routes');
const productsRoutes = require("./routes/products.routes");
const entriesRoutes = require("./routes/entries.routes");


//http://localhost:3000/
app.get("/", (req, res) => {
  // ruta/endpoint 1
  res.send("Hello World!");
});

// Habilitar rutas
http://localhost:3000/api/books
// El primer parámetro -> prefix -> /
app.use('/api/books',booksRoutes);

// http://localhost:3000/api/products
app.use('/api/products',productsRoutes);
// http://localhost:3000/api/entries
app.use('/api/entries',entriesRoutes);


// http://localhost:3000
app.listen(port, () => {
  // activar servidor en puerto 3000
  console.log(`Example app listening on port ${port}`);
});
