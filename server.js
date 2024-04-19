import express from "express";
import mongoose from "mongoose";
import authorSchema from "./api/author.js";
import bookSchema from "./api/book.js";
import seedDB from "./seedDb.js";

const server = express();
const port = 3000;
server.use(express.json());

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
server.get("/api/author", async (request, response) => {
  try {
    response.status(200).json(await Author.find());
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Get all books
/*server.get("/api/book", async (request, response) => {
  try {
    response.status(200).json(await Book.find());
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});*/
server.get( "/api/book/all", async ( req, res ) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const allBooks = await Book.countDocuments();
    const totalPages = Math.ceil(allBooks / limit);
    const books = await Book.find().limit(limit);

    res.status(200).json({
      books,
      currentPage: page,
      totalPages,
      allBooks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ett fel inträffade", error });
  }
});

//Get a author by Id
server.get("/api/author/:id", async (request, response) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.json(author);
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Uppgift 1:4, hitta specfika fields
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

server.put("/api/author/:id", async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({
      message: "Ett fel uppstod på servern vid uppdatering av användare.",
    });
  }
});
server.put("/api/book/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Ett fel uppstod på servern vid uppdatering av användare.",
    });
  }
});

server.delete("/api/book/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    res.json({ message: "Användaren har raderats!" }); // Bekräftelse på att användaren har raderats.
  } catch (error) {
    res.status(500).json({
      message: "Ett fel uppstod på servern vid radering av användare.",
    });
  }
});

server.delete("/api/author/:id", async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    res.json({ message: "Användaren har raderats!" }); // Bekräftelse på att användaren har raderats.
  } catch (error) {
    res.status(500).json({
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
