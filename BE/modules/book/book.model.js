const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    minlength: 10,
    maxlength: 10,
  },
  author: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  book_price: {
    type: Number,
  },
  publisher: {
    type: String,
  },
});
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
