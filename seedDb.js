/*import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import authorSchema from "./api/author.js";
import bookSchema from "./api/book.js";
import informationSchema from "./api/information.js";

console.log("Start seeding database!");

async function seedDB() {
  try {
    mongoose.connect(
      "mongodb+srv://annelielinden90:Kaeh14281710@cluster0.spbanxe.mongodb.net/"
    );
    const usersList = await createUsers(3);
    console.log("UsersList - ", usersList);
  } catch (error) {
    console.log(`Errormessage: ${error}`);
  }
}

async function createUsers(amount) {
  const usersList = [];
  for (let i = 0; i < amount; i++) {
    const newUser = new User({
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 15 }),
    });
    await newUser.save();
    usersList.push(newUser);
  }
  return usersList;
}
seedDB();
*/