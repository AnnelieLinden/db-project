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
    await createBooks(1);
  } catch (error) {
    console.log(`Errormessage: ${error}`);
  }
}

async function createBooks(amount) {
  const authorList = [];
  const bookList = [];
  const genre = ['Roman', 'Skräck', 'Barnbok', 'Dokumentär', 'Självbiografi', 'Skönlitteratur', 'Faktabok'];
  const languageList = ['Svenska', 'Engelska', 'Tyska', 'Danska','Norska'];
  for (let i = 0; i < amount; i++) {
    const newAuthor = new Author({
      name: faker.person.fullName()
    });
    await newAuthor.save();
    authorList.push(newAuthor);
    const newBook = new Book({
      title: faker.lorem.words({ min: 1, max: 7 }),
      isbn: faker.string.numeric(10),
      genre: genre[faker.number.int(6)],
      grade: faker.number.int({ min: 1, max: 5 }),
      author: newAuthor,
      plot: faker.lorem.paragraph(1),
      language: languageList[faker.number.int(4)],
      pages: faker.number.int({ min: 12, max: 1000 }),
      year: faker.number.int({ min: 1950, max: 2024 }),   
    });
    await newBook.save();
    authorList.push(newAuthor),    
      bookList.push(newBook);  
  }
  return (authorList, bookList);
}
export default seedDB
