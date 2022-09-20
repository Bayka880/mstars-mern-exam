const bookService = require("./book.service");

const create = async (req, res) => {
  try {
    const book = await bookService.creatBook(req);
    res.json({
      data: book,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req);
    res.json({
      success: true,
      data: deletedBook,
    });
  } catch (error) {
    res.json({
      success: false,
      data: error,
    });
  }
};

const updateBookInfo = async (req, res) => {
  const updatedBook = await bookService.updateBook(req);
  res.json({
    data: updatedBook,
  });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBook(req);
    res.json({
      success: true,
      data: books,
    });
  } catch (err) {
    res.json({ success: false, data: err });
  }
};

const getById = async (req, res) => {
  try {
    const book = await bookService.getByIdBook(req);
    res.json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};
module.exports = {
  create,
  deleteBook,
  updateBookInfo,
  getAllBooks,
  getById,
};
