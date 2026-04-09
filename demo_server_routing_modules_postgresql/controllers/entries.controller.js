const entry = require("../models/entries.model"); // Importar el modelo de la BBDD

//getEntries
// if(hay email)
//     busca por mail
// else
//     busca todo

// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
  let entries;
  const email = req.query.email;

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({
      items_found: 0,
      email,
      error: "Formato de email no válido",
    });
  }

  if (email) {
    entries = await entry.getEntriesByEmail(req.query.email);
  } else {
    entries = await entry.getAllEntries();
  }
  res.status(200).json(entries); // [] con las entries encontradas
};

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
  const newEntry = req.body; // {title,content,email,category}

  //   if ( no me pasas todas las claves en el body)
  //     return error
  const { title, content, email, category } = newEntry;

  // Validar campos no vacíos (title, content, email son obligatorios)
  if (!title || !content || !email) {
    //category no es obligatorio
    return res.status(400).json({
      items_created: 0,
      data: newEntry,
      error: "Faltan datos obligatorios: title, content o email",
    });
  }
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      items_created: 0,
      data: newEntry,
      error: "Formato de email no válido",
    });
  }

  try {
    const response = await entry.createEntry(newEntry); // INSERT INTO
    res.status(201).json({
      items_created: response,
      data: newEntry,
    });
  } catch (e) {
    console.log(e);
    console.log(e.message);

    res.status(400).json({
      items_created: 0,
      data: newEntry,
      error: e.message,
    });
  }
};

module.exports = {
  getEntries,
  createEntry,
  //deleteEntry, --> DELETE
  //updateEntry --> PUT
};
