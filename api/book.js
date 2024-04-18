import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  isbn: Number,
  genre: String,
  grade: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  plot: String,
  language: String,
  pages: Number,
  year: Number,
});
export default bookSchema;
