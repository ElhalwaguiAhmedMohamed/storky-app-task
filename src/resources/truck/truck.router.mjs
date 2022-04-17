import { Router } from "express";
import controllers from "./truck.controllers";
import { body, param } from "express-validator";
const router = Router();

// /api/truck
router.route("/").get(controllers.getMany).post(controllers.createOne);

// /api/truck/:id
router
  .route("/:id")
  .get(
    [param("id").isAlphanumeric().withMessage("id should be alphanumeric")],
    controllers.getOne
  )
  .post(
    [body("time").isString().withMessage("time should be time string")],
    controllers.getOneWithTime
  );

// /api/truck/loadparcel/:id
router
  .route("/loadparcel/:id")
  .put(
    [
      body("parcel")
        .isAlphanumeric()
        .withMessage("parcel id should be alphanumeric"),
    ],
    controllers.loadParcel
  );

// /api/truck/unloadparcel/:id
router
  .route("/unloadparcel/:id")
  .put(
    [
      body("parcel")
        .isAlphanumeric()
        .withMessage("parcel id should be alphanumeric"),
      param("id").isAlphanumeric().withMessage("id should be alphanumeric"),
    ],
    controllers.unloadParcel
  );
export default router;
