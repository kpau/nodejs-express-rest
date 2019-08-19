const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();
if (process.env.ENV === 'Test') {
  console.log('This is a test');
  mongoose.connect('mongodb://localhost/bookAPI_Test');
}
else {
  console.log('This is for real');
  mongoose.connect('mongodb://localhost/bookAPI_Prod');
}

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome');
});

app.server = app.listen(port, () => {
  console.log(`Running on ${port}...`);
});

module.exports = app;
