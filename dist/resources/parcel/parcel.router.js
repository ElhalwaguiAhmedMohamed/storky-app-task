"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _parcel = _interopRequireDefault(require("./parcel.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  body,
  param
} = require("express-validator");

const router = (0, _express.Router)();
router.route("/").get(_parcel.default.getMany).post([body("name").isString().withMessage("name should be string"), body("weight").isInt().withMessage("weight should be int")], _parcel.default.createOne);
router.route("/:id").delete([param("id").isAlphanumeric().withMessage("id should be alphanumeric")], _parcel.default.removeOne);
var _default = router;
exports.default = _default;