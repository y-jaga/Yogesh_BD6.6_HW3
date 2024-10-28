const express = require('express');
const cors = require('cors');

const { getAllBooks, getBookById } = require('./controllers/index');
const app = express();
app.use(cors());
app.use(express.json());

//Exercise 1: Retrieve All Books
//API Call: http://localhost:3000/books

app.get('/books', async (req, res) => {
  let books = await getAllBooks();

  res.json({ books });
});

//Exercise 2: Retrieve Book by ID
//API Call: http://localhost:3000/books/details/1

app.get('/books/details/:id', async (req, res) => {
  let book = await getBookById(parseInt(req.params.id));

  res.json({ book });
});

module.exports = { app };
