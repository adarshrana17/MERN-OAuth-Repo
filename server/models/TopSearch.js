import mongoose from "mongoose";

const topSearchSchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
});

export default mongoose.model("TopSearch", topSearchSchema);
