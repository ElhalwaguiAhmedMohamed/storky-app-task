"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parcel = require("./parcel.model");

var _crud = require("../../utils/crud");

var _default = (0, _crud.crudControllers)(_parcel.Parcel);

exports.default = _default;