"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parcel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parcelSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  weight: {
    type: Number,
    required: true
  }
});

const Parcel = _mongoose.default.model("parcel", parcelSchema);

exports.Parcel = Parcel;