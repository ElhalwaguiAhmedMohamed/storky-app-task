"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config"));

var _db = require("./utils/db");

var _truck = _interopRequireDefault(require("./resources/truck/truck.router"));

var _parcel = _interopRequireDefault(require("./resources/parcel/parcel.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable("x-powered-by"); //more security
//middlewares

app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)("dev")); //routes

app.use("/api/parcel", _parcel.default);
app.use("/api/truck", _truck.default); //server

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config.default.port, () => {
      console.log(`listening on port ${_config.default.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.start = start;