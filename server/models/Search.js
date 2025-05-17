import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  term: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", searchSchema);
export default Search;
