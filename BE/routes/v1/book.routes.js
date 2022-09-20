const express = require("express");
const router = express.Router();
const bookController = require("../../modules/book/index");

router.post("/", bookController.create);
router.get("/", bookController.getAllBooks);
router.delete("/:id", bookController.deleteBook);
router.put("/", bookController.updateBookInfo);
router.get("/:id", bookController.getById);

module.exports = router;
