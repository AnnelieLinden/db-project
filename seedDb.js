import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import authorSchema from "./api/author.js";
import bookSchema from "./api/book.js";

console.log("Start seeding database!");
const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);

async function seedDB() {
  try {
    mongoose.connect(
      "mongodb+srv://annelielinden90:Kaeh14281710@cluster0.spbanxe.mongodb.net/"
    );
    const booksList = await createBooks(3);
    console.log("BooksList - ", booksList);
  } catch (error) {
    console.log(`Errormessage: ${error}`);
  }
}

async function createBooks(amount) {
  const authorList = [];
  const bookList = [];
  for (let i = 0; i < amount; i++) {
    const newAuthor = new Author({
      name: faker.internet.fullname()
    });
    await newAuthor.save();
    authorList.push(newAuthor);
    const newBook = new Book({
      title: faker.internet.title(),
      isbn: faker.string.numeric(10),
      genre: faker.helpers.arrayElements(['Roman', 'Skräck', 'Barnbok', 'Dokumentär', 'Självbiografi', 'Skönlitteratur', 'Faktabok'],1),
      grade: faker.number.int({ min: 1, max: 5 }),
      author: newAuthor,
      plot: faker.lorem.paragraph(1),
      language: faker.helpers.arrayElements(['Svenska', 'Engelska', 'Tyska'],1),
      pages: faker.number.int({ min: 12, max: 1000 }),
      year: faker.number.int({ min: 1950, max: 2024 })
      authorList.push(newAuthor);    
      bookList.push(newBook);    
    });
  }
  return authorList;
}

export default seedDB()
