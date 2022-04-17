"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Truck = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const truckSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    default: 0
  },
  parcels: {
    type: [{
      parcel: {
        type: _mongoose.default.SchemaTypes.ObjectId,
        ref: "parcel"
      },
      addedAt: String
    }],
    default: []
  }
}, {
  timestamp: true
});

const Truck = _mongoose.default.model("truck", truckSchema);

exports.Truck = Truck;