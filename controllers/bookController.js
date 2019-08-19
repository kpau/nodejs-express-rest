function booksController(Book) {
  function get(req, res) {
    // const { query } = res;
    const { title, author, genre, read } = res.query;
    const query = { title, author, genre, read };

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  }

  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    book.save();

    res.status(201);
    return res.json(book._id);
  }

  return { get, post };
}

module.exports = booksController;
