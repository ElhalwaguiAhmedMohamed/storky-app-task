import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export const Parcel = mongoose.model("parcel", parcelSchema);
