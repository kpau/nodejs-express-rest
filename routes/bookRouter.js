const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

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
    })
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();

      res.status(201).json(book._id);
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

  return bookRouter;
}

module.exports = routes;
