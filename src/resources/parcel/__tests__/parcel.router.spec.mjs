import router from "../parcel.router";

describe("Parcel router", () => {
  it("has needed routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
      { path: "/:id", method: "delete" },
    ];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
