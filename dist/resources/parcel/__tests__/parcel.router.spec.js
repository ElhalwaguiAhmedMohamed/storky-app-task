"use strict";

var _parcel = _interopRequireDefault(require("../parcel.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Parcel router", () => {
  it("has needed routes", () => {
    const routes = [{
      path: "/",
      method: "get"
    }, {
      path: "/",
      method: "post"
    }, {
      path: "/:id",
      method: "delete"
    }];
    routes.forEach(route => {
      const match = _parcel.default.stack.find(s => s.route.path && s.route.methods[route.method]);

      expect(match).toBeTruthy();
    });
  });
});