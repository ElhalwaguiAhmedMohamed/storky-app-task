"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _parcel = require("../parcel.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Parcel model", () => {
  describe("schema", () => {
    test("name", () => {
      const name = _parcel.Parcel.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true
      });
    });
    test("type", () => {
      const type = _parcel.Parcel.schema.obj.type;
      expect(type).toEqual({
        type: String
      });
    });
    test("weight", () => {
      const weight = _parcel.Parcel.schema.obj.weight;
      expect(weight).toEqual({
        type: Number,
        required: true
      });
    });
  });
});