"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOne = exports.removeOne = exports.getOne = exports.getMany = exports.crudControllers = exports.createOne = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create(_objectSpread({}, req.body));
    res.status(201).json({
      data: doc
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.createOne = createOne;

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    });
    if (!updatedDoc) return res.status(400).end();
    res.status(200).json({
      data: updatedDoc
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.updateOne = updateOne;

const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id
    });
    if (!removed) return res.status(400).end();
    return res.status(200).json({
      data: removed
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.removeOne = removeOne;

const getOne = model => async (req, res) => {
  try {
    const doc = await model.findOne({
      _id: req.params.id
    }).lean().exec();
    if (!doc) return res.status(404).end();
    return res.status(200).json({
      data: doc
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.getOne = getOne;

const getMany = model => async (req, res) => {
  try {
    const docs = await model.find({}).lean().exec();
    if (!docs) return res.status(404).end();
    return res.status(200).json({
      data: docs
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

exports.getMany = getMany;

const crudControllers = model => ({
  createOne: createOne(model),
  updateOne: updateOne(model),
  getOne: getOne(model),
  getMany: getMany(model),
  removeOne: removeOne(model)
});

exports.crudControllers = crudControllers;