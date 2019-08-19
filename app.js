const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();
const bookRouter = express.Router();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    // const { query } = res;
    const { title, author, genre, read } = res.query;
    const query = { title, author, genre, read };

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(res.params.bookId, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`Running on ${port}...`);
});
