import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      default: 0,
    },
    parcels: {
      type: [
        {
          parcel: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "parcel",
          },
          addedAt: String,
        },
      ],
      default: [],
    },
  },
  { timestamp: true }
);

export const Truck = mongoose.model("truck", truckSchema);
