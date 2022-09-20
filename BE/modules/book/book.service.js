const Book = require("./book.model");

const creatBook = async (req) => {
  const book = new Book(req.body);
  return book.save();
};

const getAllBook = async (req) => {
  const data = await Book.find();
  return data;
};

const updateBook = async (req) => {
  const { id } = req.query;
  console.log(id);
  await Book.findByIdAndUpdate(id, req.body);
  const book = await Book.findById(id);
  return book;
};

const deleteBook = async (req) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  return book;
};

const getByIdBook = async (req) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  return book;
};

module.exports = {
  creatBook,
  getAllBook,
  updateBook,
  deleteBook,
  getByIdBook,
};
