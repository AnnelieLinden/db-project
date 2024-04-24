import express from "express";
import mongoose from "mongoose";
import authorSchema from "./api/author.js";
import bookSchema from "./api/book.js";
import seedDB from "./seedDb.js";
import { ObjectId } from "bson";
import rateLimit from "express-rate-limit";

const server = express();
const port = 3000;
server.use(express.json());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later"
});

server.use("/api", limiter);
const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);
seedDB();
//add book
server.post("/api/book", async (request, response) => {
  try {
    const newBook = new Book({
      title: request.body.title,
      isbn: request.body.isbn,
      genre: request.body.genre,
      grade: request.body.grade,
      author: request.body.author,
      plot: request.body.plot,
      language: request.body.language,
      pages: request.body.pages,
      year: request.body.year,
    });
    const savedBook = await newBook.save();
    response.status(201).json({
      message: "Du skapar en ny bok!",
      newBook: newBook,
      savedBook: savedBook,
    });
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//add author
server.post("/api/author", async (request, response) => {

  try {
    const newAuthor = new Author({
      name: request.body.name,
      _id: request.body.id,
    });
    const savedAuthor = await newAuthor.save();
    response.status(201).json({
      message: "Du skapar en ny författare!",
      newAuthor: newAuthor,
      savedAuthor: savedAuthor,
    });
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Get all authors
server.get("/api/author/all", async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 5;
    const allAuthors = await Author.countDocuments();
    const totalPages = Math.ceil(allAuthors / limit);
    const authors = await Author.find().limit(limit);

    response.status(200).json({
      authors,
      currentPage: page,
      totalPages,
      allAuthors,
    });
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Get all books
server.get("/api/book/all", async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 5;
    const allBooks = await Book.countDocuments();
    const totalPages = Math.ceil(allBooks / limit);
    const books = await Book.find().limit(limit);

    response.status(200).json({
      books,
      currentPage: page,
      totalPages,
      allBooks,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Ett fel inträffade", error });
  }
});
//Get a author by Id
server.get("/api/author/:id", async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(400).json({ message: "Felaktigt id" });
  }
  try {
    const author = await Author.findById(
      request.params.id,
      request.query.fields
    );
    if (!author) {
      return response.status(404).json({ message: "Användare hittades inte" });
    }
    return response.json(author);
  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Get a book with fields
server.get("/api/book/:id", async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).json({ message: "Felaktigt id" });
  }
  try {
    const book = await Book.findById(request.params.id, request.query.fields);
    if (!book) {
      return response.status(404).json({ message: "Hittades inte" });
    }
    response.json(book);
  } catch (error) {
    response.status(500).json({
      message: "Ett fel uppstod på servern vid hämtning.",
      error: error,
    });
  }
});
//update author
server.put("/api/author/:id", async (request, response) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    if (!updatedAuthor) {
      return response.status(404).json({ message: "Användare hittades inte" });
    }
    response.json(updatedAuthor);
  } catch (error) {
    response.status(500).json({
      message: "Ett fel uppstod på servern vid uppdatering av användare.",
    });
  }
});
//update book
server.put("/api/book/:id", async (request, response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!updatedBook) {
      return response.status(404).json({ message: "Användare hittades inte" });
    }
    response.json(updatedBook);
  } catch (error) {
    response.status(500).json({
      message: "Ett fel uppstod på servern vid uppdatering av användare.",
    });
  }
});
//delete book
server.delete("/api/book/:id", async (request, response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(request.params.id);
    if (!deletedBook) {
      return response.status(404).json({ message: "Boken hittades inte" });
    }

    response.status(204).json({ message: "Boken har raderats!" });
  } catch (error) {
    response.status(500).json({
      message: "Ett fel uppstod på servern.",
    });
  }
});
//delete
server.delete("/api/author/:id", async (request, response) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(request.params.id);
    if (!deletedAuthor) {
      return response.status(404).json({ message: "författaren hittades inte" });
    }

    response.status(204).json({ message: "författaren har raderats!" });
  } catch (error) {
    response.status(500).json({
      message: "Ett fel uppstod på servern vid radering av användare.",
    });
  }
});


mongoose.connect(
  "mongodb+srv://annelielinden90:Kaeh14281710@cluster0.spbanxe.mongodb.net/"
);
server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
