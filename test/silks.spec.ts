import { parseSilkUrl } from "../src/utils/silks";

describe.skip("silks tets", () => {
  it("should should create silk from ", () => {
    const actual = parseSilkUrl(
      "ROYAL%20BLUE%2C%20YELLOW%20SASH%2C%C2%A0RED%C2%A0CAP"
    );
    expect(actual.jacketColour).toEqual("ROYAL BLUE");
  });
});
