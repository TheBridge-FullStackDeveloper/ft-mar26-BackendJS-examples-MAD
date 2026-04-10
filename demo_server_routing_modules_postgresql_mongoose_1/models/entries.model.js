const { Pool } = require('pg');
const queries = require('../queries/entries.queries') // Queries SQL

const pool = require('../config/db_pgsql');

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: '5433',
//     database: 'postgres',
//     password: '123456'
//   });

// GET
// SELECT * FROM Entries 
// param: email
// return: entries de author con ese email
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
// SELECT
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
// INSERT 
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        // query(petición,[parámetros]) evita inyecciones SQL, el segundo parametro es un array con los valores a insertar
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE
//UPDATE

const updateEntry = async (entry) => {
    const { new_title, title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        // query(petición,[parámetros]) evita inyecciones SQL, el segundo parametro es un array con los valores a insertar
        const data = await client.query(queries.updateEntry,[new_title, content, email, category, title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    //deleteEntry
    updateEntry
}

module.exports = entries;


// Pruebas

/*     getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data)) */
/*
getAllEntries()
.then(data=>console.log(data))
*/


/* let newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}

createEntry(newEntry)
    .then(data => console.log(data)) */


let editedEntry = {
    new_title:"Se acabaron las Magdalenas",
    title: "Noticia: Un panda suelto por la ciudad",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "albertu@thebridgeschool.es",
    category: "sucesos"
}

updateEntry(editedEntry)
    .then(data => console.log(data))


