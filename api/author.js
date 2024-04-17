import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: String,
  name: String
});
export default authorSchema
