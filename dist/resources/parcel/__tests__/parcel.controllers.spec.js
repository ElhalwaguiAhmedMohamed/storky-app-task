"use strict";

var _parcel = _interopRequireDefault(require("../parcel.controllers"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("parcel controllers", () => {
  test("has operations", () => {
    const methods = ["getOne", "getMany", "createOne", "removeOne", "updateOne"];
    methods.forEach(name => {
      expect((0, _lodash.isFunction)(_parcel.default[name])).toBe(true);
    });
  });
});