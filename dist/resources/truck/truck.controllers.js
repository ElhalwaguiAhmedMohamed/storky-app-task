"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _truck = require("./truck.model");

var _parcel = require("../parcel/parcel.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _objectSpread(_objectSpread({}, (0, _crud.crudControllers)(_truck.Truck)), {}, {
  getOne: async (req, res) => {
    try {
      const doc = await _truck.Truck.findOne({
        _id: req.params.id
      }).populate("parcels").lean().exec();
      if (!doc) return res.status(404).end();
      return res.status(200).json({
        data: doc,
        num_of_parcels: doc.parcels.length
      });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  loadParcel: async (req, res) => {
    try {
      const parcel = await _parcel.Parcel.findById({
        _id: req.body.parcel
      });
      const parcelDoc = {
        parcel: req.parcel,
        addedAt: new Date().toISOString().substr(11, 8)
      };
      console.log(parcelDoc);
      const truck = await _truck.Truck.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          parcels: parcelDoc
        },
        $inc: {
          weight: parcel.weight
        }
      }, {
        new: true
      });

      if (!truck) {
        return res.status(404).json({
          message: "this truck was not found"
        });
      }

      return res.status(200).json({
        data: truck
      });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  unloadParcel: async (req, res) => {
    try {
      const parcel = await _parcel.Parcel.findById({
        _id: req.body.parcel
      });
      const truck = await _truck.Truck.findOneAndUpdate({
        _id: req.params.id,
        weight: {
          $gt: 0
        }
      }, {
        $pull: {
          parcels: req.body.parcel
        },
        $inc: {
          weight: -parcel.weight
        }
      }, {
        new: true
      });
      if (!truck) return res.status(404).json({
        message: "this truck was not found or does not have the parcel"
      });
      res.status(200).json({
        data: truck
      });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  },
  getOneWithTime: async (req, res) => {
    try {
      const doc = await _truck.Truck.findOne({
        _id: req.params.id
      }).populate("parcels.parcel").lean().exec();
      let number = 0;
      doc.parcels.forEach(parcel => {
        if (parcel.addedAt != req.body.time) {
          number++;
        }
      });
      if (!doc) return res.status(404).end();
      return res.status(200).json({
        data: doc,
        num_of_parcels: number
      });
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
});

exports.default = _default;