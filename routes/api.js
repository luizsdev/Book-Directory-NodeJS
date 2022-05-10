const express = require("express");
const router = require("express").Router();
const bookModel = require("../models/bookModels");
const app = express();

//GET ALL BOOKS LIST
router.get("/books", async function (req, res) {
  const bookList = await bookModel.find();
  res.send(bookList);
});
//GET A SPECIFIC BOOK
router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findOne({ id: id });
  if (book) {
    res.send(book);
  } else {
    res.send("Book not found!");
  }
});
//ROUTE FOR POSTING NEW BOOKS
router.post("/books", async (req, res) => {
  const title = req.body.title;
  const id = req.body.id;
  const author = req.body.author;
  //CHECK IF BOOK ALREADY EXISTS
  const bookExist = await bookModel.findOne({ id: id });
  if (bookExist) {
    res.send("Book already exists");
  } else {
    const data = await bookModel.create({ title, id, author });
    data.save();
    res.send("Book sucessfully added");
  }
});
//ROUTE FOR DELETING BOOKS
router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookExist = await bookModel.findOne({ id: id });
  if (!bookExist) {
    res.send("Book doesn't exist");
  } else {
    await bookModel
      .deleteOne({ id: id })
      .then(() => {
        res.send("Book sucessfully deleted");
      })
      .catch((e) => res.send(e));
  }
});
//ROUTE FOR UPDATING BOOKS
router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const update = { title: title, author: author };
  const book = await bookModel.findOne({ id: id });
  if (!book) {
    res.send("Book doesn't exist");
  } else {
    await book.updateOne(update);
    res.send("Book updated sucesfully");
  }
});
module.exports = router;
