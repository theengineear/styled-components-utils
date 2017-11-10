import * as resolvers from "../resolvers";
import * as core from "../core";

describe("core", () => {
  describe("path", () => {
    it("returns undefined when not found", () => {
      expect(core.path({}, "a")).toBeUndefined();
      expect(core.path({}, "a.b")).toBeUndefined();
      expect(core.path({}, ".a")).toBeUndefined();
    });
  });
  describe("isResolver", () => {
    it("returns true for functions", () => {
      expect(core.isResolver(() => {})).toBe(true);
      expect(core.isResolver("blah")).toBe(false);
    });
  });

  describe("resolve", () => {
    it("simply returns values if they are not functions", () => {
      const values = [{}, [], true, false, "oh hai", undefined, null, 0, 1];
      values.forEach(value => {
        expect(core.resolve(value, {})).toBe(value);
      });
    });
    it("passes a function props", () => {
      const props = { a: "A" };
      const valueFunc = obj => obj.a;
      expect(core.resolve(valueFunc, props)).toBe(props.a);
    });
    it("does not break for undefined values", () => {
      const valueFunc = obj => obj.dne;
      expect(core.resolve(valueFunc, {})).toBeUndefined();
    });
  });
});

describe("resolvers", () => {
  describe("prop", () => {
    it("accepts a string path and returns a function to resolve", () => {
      const props = { a: { b: { c: "see?" } } };
      const path = "a.b.c";
      expect(resolvers.prop(path)(props)).toBe(props.a.b.c);
    });
  });
  describe("map", () => {
    it("returns a value if no resolvers exist", () => {
      const condition = { a: "A", b: "B" };
      expect(resolvers.map(condition, "a")).toBe("A");
      expect(resolvers.map(condition, "b")).toBe("B");
    });
    it("can also accept a value function to be resolved with props", () => {
      const props = { aa: "a", bb: "b" };
      const condition = { a: "A", b: "B" };
      expect(resolvers.map(condition, resolvers.prop("aa"))(props)).toBe("A");
      expect(resolvers.map(condition, resolvers.prop("bb"))(props)).toBe("B");
    });
    it("can also accept value functions in the condition object", () => {
      const props = { aa: "a", bb: "b", a: "A", b: "B" };
      const condition = { a: resolvers.prop("a"), b: resolvers.prop("b") };
      expect(resolvers.map(condition, resolvers.prop("aa"))(props)).toBe("A");
      expect(resolvers.map(condition, resolvers.prop("bb"))(props)).toBe("B");
    });
  });
  describe("tern", () => {
    it("returns a value if no resolvers exist", () => {
      expect(resolvers.tern("A", "B", true)).toBe("A");
      expect(resolvers.tern("A", "B", false)).toBe("B");
    });
    it("can also accept a value function to be resolved with props", () => {
      const props = { true: true, false: false };
      expect(resolvers.tern("A", "B", resolvers.prop("true"))(props)).toBe("A");
      expect(resolvers.tern("A", "B", resolvers.prop("false"))(props)).toBe(
        "B"
      );
    });
    it("can also accept value functions in a/b", () => {
      const props = { true: true, false: false, a: "A", b: "B" };
      expect(
        resolvers.tern(
          resolvers.prop("a"),
          resolvers.prop("b"),
          resolvers.prop("true")
        )(props)
      ).toBe("A");
      expect(
        resolvers.tern(
          resolvers.prop("a"),
          resolvers.prop("b"),
          resolvers.prop("false")
        )(props)
      ).toBe("B");
    });
  });
  describe("join", () => {
    it("joins strings together", () => {
      const expected = "really, just join us";
      const actual = resolvers.join(" ", "really,", "just join", "us");
      expect(actual).toBe(expected);
    });
    it("returns a function that resolves to a string if necessary", () => {
      const props = { prop: "later" };
      const expected = "later, just join us";
      const resolver = resolvers.prop("prop");
      const actual = resolvers.join("", resolver, ", just join ", "us")(props);
      expect(actual).toBe(expected);
    });
  });
  describe("not", () => {
    it("returns a boolean directly if possible", () => {
      expect(resolvers.not("a")).toBe(false);
      expect(resolvers.not("")).toBe(true);
      expect(resolvers.not(false)).toBe(true);
      expect(resolvers.not(true)).toBe(false);
    });
    it("returns a resolver if necessary", () => {
      const props = { isMammal: true, isCat: false };
      expect(resolvers.not(resolvers.prop("isMammal"))(props)).toBe(false);
      expect(resolvers.not(resolvers.prop("isCat"))(props)).toBe(true);
    });
  });
  describe("or", () => {
    it("returns a boolean directly if possible", () => {
      expect(resolvers.or("a", "b")).toBe(true);
      expect(resolvers.or("", true)).toBe(true);
      expect(resolvers.or(true, false)).toBe(true);
      expect(resolvers.or("", false)).toBe(false);
      expect(resolvers.or(resolvers.prop("unknown"), true)).toBe(true);
      expect(resolvers.or(true, resolvers.prop("unknown"))).toBe(true);
    });
    it("returns a resolver if necessary", () => {
      const props = { isMammal: true, isCat: false };
      expect(resolvers.or(resolvers.prop("isMammal"), false)(props)).toBe(true);
      expect(resolvers.or(false, resolvers.prop("isMammal"))(props)).toBe(true);
      expect(
        resolvers.or(resolvers.prop("isCat"), resolvers.prop("isMammal"))(props)
      ).toBe(true);
      expect(
        resolvers.or(resolvers.prop("isMammal"), resolvers.prop("isCat"))(props)
      ).toBe(true);
      expect(
        resolvers.or(resolvers.prop("isCat"), resolvers.prop("unknown"))(props)
      ).toBe(false);
    });
  });
  describe("and", () => {
    it("returns a boolean directly if possible", () => {
      expect(resolvers.and("a", "b")).toBe(true);
      expect(resolvers.and("", true)).toBe(false);
      expect(resolvers.and(true, false)).toBe(false);
      expect(resolvers.and("", false)).toBe(false);
      expect(resolvers.and(resolvers.prop("unknown"), false)).toBe(false);
      expect(resolvers.and(false, resolvers.prop("unknown"))).toBe(false);
    });
    it("returns a resolver if necessary", () => {
      const props = { isMammal: true, isCat: false };
      expect(resolvers.and(resolvers.prop("isMammal"), true)(props)).toBe(true);
      expect(resolvers.and(true, resolvers.prop("isMammal"))(props)).toBe(true);
      expect(
        resolvers.and(resolvers.prop("isCat"), resolvers.prop("isMammal"))(
          props
        )
      ).toBe(false);
      expect(
        resolvers.and(resolvers.prop("isMammal"), resolvers.prop("isCat"))(
          props
        )
      ).toBe(false);
      expect(
        resolvers.and(resolvers.prop("isCat"), resolvers.prop("unknown"))(props)
      ).toBe(false);
    });
  });
  describe("is", () => {
    it("returns a boolean directly if possible", () => {
      expect(resolvers.is("a", "b")).toBe(false);
      expect(resolvers.is("", true)).toBe(false);
      expect(resolvers.is("", "")).toBe(true);
      expect(resolvers.is([], [])).toBe(false);
      expect(resolvers.is({}, {})).toBe(false);
    });
    it("returns a resolver if necessary", () => {
      const props = { a: "yes", b: "yes", c: "no" };
      expect(
        resolvers.is(resolvers.prop("a"), resolvers.prop("b"))(props)
      ).toBe(true);
      expect(
        resolvers.is(resolvers.prop("a"), resolvers.prop("c"))(props)
      ).toBe(false);
      expect(
        resolvers.is(resolvers.prop("b"), resolvers.prop("c"))(props)
      ).toBe(false);
      expect(resolvers.is(resolvers.prop("b"), "no")(props)).toBe(false);
      expect(resolvers.is("yes", resolvers.prop("c"))(props)).toBe(false);
    });
  });
  describe("includes", () => {
    it("returns a boolean directly if possible", () => {
      const array = ["A", "B"];
      expect(resolvers.includes(array, "B")).toBe(true);
      expect(resolvers.includes(array, true)).toBe(false);
      expect(resolvers.includes(array, "C")).toBe(false);
      expect(resolvers.includes(array, [])).toBe(false);
      expect(resolvers.includes(array, {})).toBe(false);
    });
    it("returns a resolver if test needs resolving", () => {
      const array = ["A", "B"];
      const props = { a: "A", b: "B", c: "C" };
      expect(resolvers.includes(array, resolvers.prop("a"))(props)).toBe(true);
      expect(resolvers.includes(array, resolvers.prop("b"))(props)).toBe(true);
      expect(resolvers.includes(array, resolvers.prop("c"))(props)).toBe(false);
    });
    it("returns a resolver if array needs resolving", () => {
      const array = ["A", "B"];
      const props = { array, a: "A", b: "B", c: "C" };
      expect(
        resolvers.includes(resolvers.prop("array"), resolvers.prop("a"))(props)
      ).toBe(true);
      expect(resolvers.includes(resolvers.prop("array"), "A")(props)).toBe(
        true
      );
      expect(
        resolvers.includes(resolvers.prop("array"), resolvers.prop("c"))(props)
      ).toBe(false);
      expect(resolvers.includes(resolvers.prop("array"), "C")(props)).toBe(
        false
      );
    });
  });
  describe("declare", () => {
    it("returns empty string if `test` is a false-y non-resolver", () => {
      expect(resolvers.declare("color", "white", false)).toBe("");
      expect(resolvers.declare("color", "white", null)).toBe("");
      expect(resolvers.declare("color", "white", "")).toBe("");
      expect(resolvers.declare("color", "white", 0)).toBe("");
    });
    it("returns declaration if `test` undefined and value resolved", () => {
      expect(resolvers.declare("color", "white")).toBe("color: white;");
    });
    it("returns declaration if `test` is truthy and value resolved", () => {
      expect(resolvers.declare("color", "white", true)).toBe("color: white;");
      expect(resolvers.declare("color", "white", 1)).toBe("color: white;");
      expect(resolvers.declare("color", "white", -1)).toBe("color: white;");
      expect(resolvers.declare("color", "white", "hi")).toBe("color: white;");
    });
    it("returns resolver if necessary", () => {
      const props = { definedValue: "black", trueTest: true, falseTest: false };
      expect(
        resolvers.declare("color", "white", resolvers.prop("trueTest"))(props)
      ).toBe("color: white;");
      expect(
        resolvers.declare("color", resolvers.prop("definedValue"), true)(props)
      ).toBe("color: black;");
      expect(
        resolvers.declare("color", "black", resolvers.prop("trueTest"))(props)
      ).toBe("color: black;");
      expect(
        resolvers.declare("color", undefined, resolvers.prop("trueTest"))
      ).toBe("");
      expect(
        resolvers.declare("color", resolvers.prop("undefined"), true)(props)
      ).toBe("");
      expect(resolvers.declare("color", undefined, true)).toBe("");
      expect(
        resolvers.declare("color", "white", resolvers.prop("falseTest"))(props)
      ).toBe("");
      expect(
        resolvers.declare(
          "color",
          resolvers.prop("definedValue"),
          resolvers.prop("trueTest")
        )(props)
      ).toBe("color: black;");
      expect(
        resolvers.declare(
          "color",
          resolvers.prop("definedValue"),
          resolvers.prop("falseTest")
        )(props)
      ).toBe("");
      expect(
        resolvers.declare(
          "color",
          resolvers.prop("undefinedValue"),
          resolvers.prop("trueTest")
        )(props)
      ).toBe("");
      expect(
        resolvers.declare(
          "color",
          resolvers.prop("undefinedValue"),
          resolvers.prop("falseTest")
        )(props)
      ).toBe("");
    });
  });
});
