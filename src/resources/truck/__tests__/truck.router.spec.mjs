import router from "../truck.router";

describe("Truck router", () => {
  test("has needed routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
      { path: "/:id", method: "get" },
      { path: "/loadparcel/:id", method: "put" },
      { path: "/unloadparcel/:id", method: "put" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
