import { crudControllers } from "../../utils/crud";
import { Truck } from "./truck.model";
import { Parcel } from "../parcel/parcel.model";
import mongoose from "mongoose";

export default {
  ...crudControllers(Truck),
  getOne: async (req, res) => {
    try {
      const doc = await Truck.findOne({ _id: req.params.id })
        .populate("parcels")
        .lean()
        .exec();
      if (!doc) return res.status(404).end();
      return res
        .status(200)
        .json({ data: doc, num_of_parcels: doc.parcels.length });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  loadParcel: async (req, res) => {
    try {
      const parcel = await Parcel.findById({ _id: req.body.parcel });
      const parcelDoc = {
        parcel: req.parcel,
        addedAt: new Date().toISOString().substr(11, 8),
      };
      console.log(parcelDoc);
      const truck = await Truck.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { parcels: parcelDoc },
          $inc: { weight: parcel.weight },
        },
        { new: true }
      );
      if (!truck) {
        return res.status(404).json({ message: "this truck was not found" });
      }
      return res.status(200).json({ data: truck });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  unloadParcel: async (req, res) => {
    try {
      const parcel = await Parcel.findById({ _id: req.body.parcel });
      const truck = await Truck.findOneAndUpdate(
        { _id: req.params.id, weight: { $gt: 0 } },
        {
          $pull: { parcels: req.body.parcel },
          $inc: { weight: -parcel.weight },
        },
        { new: true }
      );
      if (!truck)
        return res.status(404).json({
          message: "this truck was not found or does not have the parcel",
        });
      res.status(200).json({ data: truck });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  getOneWithTime: async (req, res) => {
    try {
      const doc = await Truck.findOne({ _id: req.params.id })
        .populate("parcels.parcel")
        .lean()
        .exec();
      let number = 0;
      doc.parcels.forEach((parcel) => {
        if (parcel.addedAt != req.body.time) {
          number++;
        }
      });
      if (!doc) return res.status(404).end();
      return res.status(200).json({
        data: doc,
        num_of_parcels: number,
      });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
};
