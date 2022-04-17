import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import { connect } from "./utils/db";
import truckRouter from "./resources/truck/truck.router";
import parcelRouter from "./resources/parcel/parcel.router";
export const app = express();

app.disable("x-powered-by"); //more security

//middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/parcel", parcelRouter);
app.use("/api/truck", truckRouter);
//server
export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
