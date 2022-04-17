import { Router } from "express";
import controllers from "./parcel.controllers";
const { body, param } = require("express-validator");
const router = Router();
router
  .route("/")
  .get(controllers.getMany)
  .post(
    [
      body("name").isString().withMessage("name should be string"),
      body("weight").isInt().withMessage("weight should be int"),
    ],
    controllers.createOne
  );

router
  .route("/:id")
  .delete(
    [param("id").isAlphanumeric().withMessage("id should be alphanumeric")],
    controllers.removeOne
  );

export default router;
