import { FloatNumberMask } from "../../lib/masks";

test("getType results money", () => {
  var expected = "float-number";
  var received = FloatNumberMask.getType();

  expect(received).toBe(expected);
});

test("1 results 1", () => {
  var mask = new FloatNumberMask();
  var expected = "1";
  var received = mask.getValue("1");

  expect(received).toBe(expected);
});
