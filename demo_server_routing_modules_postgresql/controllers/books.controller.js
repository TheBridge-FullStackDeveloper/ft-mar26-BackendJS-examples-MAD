// En el futuro será mi "base de datos"
let books = [
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


const createBook = (req, res) => {
  console.log("**BODY**");
  console.log(req.body);

  const new_book = req.body;

  if (new_book.title && new_book.author && new_book.year) {
    // Añadir libro
    // COn SQL sería algo como INSERT INTO books (title, author, year) VALUES (...,...,...)
    books.push(new_book);
    // Devolver respuesta
    res.status(201).json({ success: true, msj: "Libro creado!", new_book });
  } else {
    res
      .status(400)
      .json({ success: false, msj: "Fallo al crear libro!", new_book });
  }
};

const getBook = (req, res) => {
  console.log(req.params.title);
  const title = req.params.title;
  if (title) {
    const book = books.find((book) => book.title === title);

    if (book) {
      res.status(200).json(book); // devuelve el libro encontradoodfdff
    } else {
      res.status(404).json({ msj: "Libro no encontrado" });
    }
  } else {
    res.status(200).json(books); // devuelve todos los libros
  }
};

const editBook = (req, res) => {
  const title = req.body.title;
  const book_data = req.body; // datos del libro a editar

  // Buscar libro por title
  const index = books.findIndex((book) => book.title === title);
  console.log("Indice: " + index);

  if (index != -1) {
    // Existe el libro ?
    const { new_title } = book_data;
    delete book_data["new_title"]; // Borrar clave new_title
    const old_book = books[index]; // Libro original
    const new_book = { ...old_book, ...book_data }; // Libro actualizado
    new_book.title = new_title; // Actualizar nombre (si lo hubiera)

    console.log(new_book);

    books[index] = new_book; // Guardar el libro editado

    res.status(201).json({ success: true, msj: "Libro editado!", new_book });
  } else {
    res
      .status(400)
      .json({
        success: false,
        msj: "Error. Libro con encontrado!. Campos que puedes utilizar: (title, new_title, author, year). Es obligatorio usar title",
        book_data,
      });
  }
};

const deleteBook = (req, res) => {

    const title = req.params.title;
  
    if(title){ // Borra 1
      // Buscar libro por title
      const index = books.findIndex(book=> book.title === title);
      console.log("Indice: "+index);
  
      if(index != -1){ // ¿Existe el libro?
        const deleted_book = books.splice(index,1)[0]; // Borra libro del array
        res.status(200).json({ success: true, msj: "Libro borrado!",deleted_book});
      }else{
        res.status(404).json({ success: false, msj: "Libro no encontrado" });
      }
  
    }else{ // Borra todos
      books = []; // borrar todos los libros
      res.status(200).json({ success: true, msj: "Todos los libros borrados!"});
  
    }
  
  }
  
// EXPORT
module.exports = {
    createBook,
    getBook,
    editBook,
    deleteBook
}