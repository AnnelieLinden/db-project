import express from "express";
import mongoose from "mongoose";
import authorSchema from "./api/author.js";
import bookSchema from "./api/book.js";

const server = express();
const port = 3000;
server.use(express.json());

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);

//add book
server.post("/api/book", async (request, response) => {
  try {
    const newBook = new Book({
      title: request.body.title,
      isbn: request.body.isbn,
      genre: request.body.genre,
      grade: request.body.grade,
      authorId: request.body.authorId,
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
server.get("/api/book", async (request, response) => {
  try {
    response.status(200).json(await Book.find());
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Get a author by Id
server.get("/api/author/:id", async (request, response) => {
  try {
    response.status(200).json();
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error });
  }
});
//Uppgift 1:4, hitta specfika fields
server.get("/api/book/:id", async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).json({message: "Felaktigt id"})
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

mongoose.connect(
  "mongodb+srv://annelielinden90:Kaeh14281710@cluster0.spbanxe.mongodb.net/"
);
server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

/* id: mongoose.Types.ObjectId.isValid(req.params.id),

Query.prototype.getFilter()
Returns:
«Object» current query filter
Returns the current query filter (also known as conditions) as a POJO.

Example:
const query = new Query();
query.find({ a: 1 }).where('b').gt(2);
query.getFilter(); // { a: 1, b: { $gt: 2 } }*/
