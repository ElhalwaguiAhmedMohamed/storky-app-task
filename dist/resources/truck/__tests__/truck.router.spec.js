"use strict";

var _truck = _interopRequireDefault(require("../truck.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Truck router", () => {
  test("has needed routes", () => {
    const routes = [{
      path: "/",
      method: "get"
    }, {
      path: "/",
      method: "post"
    }, {
      path: "/:id",
      method: "get"
    }, {
      path: "/loadparcel/:id",
      method: "put"
    }, {
      path: "/unloadparcel/:id",
      method: "put"
    }];
    routes.forEach(route => {
      const match = _truck.default.stack.find(s => s.route.path && s.route.methods[route.method]);

      expect(match).toBeTruthy();
    });
  });
});