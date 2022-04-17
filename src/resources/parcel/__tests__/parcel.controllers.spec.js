import controllers from "../parcel.controllers";
import { isFunction } from "lodash";

describe("parcel controllers", () => {
  test("has operations", () => {
    const methods = [
      "getOne",
      "getMany",
      "createOne",
      "removeOne",
      "updateOne",
    ];
    methods.forEach((name) => {
      expect(isFunction(controllers[name])).toBe(true);
    });
  });
});
