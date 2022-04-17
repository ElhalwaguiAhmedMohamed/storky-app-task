"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _truck = _interopRequireDefault(require("./truck.controllers"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/truck

router.route("/").get(_truck.default.getMany).post(_truck.default.createOne); // /api/truck/:id

router.route("/:id").get([(0, _expressValidator.param)("id").isAlphanumeric().withMessage("id should be alphanumeric")], _truck.default.getOne).post([(0, _expressValidator.body)("time").isString().withMessage("time should be time string")], _truck.default.getOneWithTime); // /api/truck/loadparcel/:id

router.route("/loadparcel/:id").put([(0, _expressValidator.body)("parcel").isAlphanumeric().withMessage("parcel id should be alphanumeric")], _truck.default.loadParcel); // /api/truck/unloadparcel/:id

router.route("/unloadparcel/:id").put([(0, _expressValidator.body)("parcel").isAlphanumeric().withMessage("parcel id should be alphanumeric"), (0, _expressValidator.param)("id").isAlphanumeric().withMessage("id should be alphanumeric")], _truck.default.unloadParcel);
var _default = router;
exports.default = _default;