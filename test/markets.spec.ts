import { makeMarketId } from "../src/utils/general";
import { getMarketIdFromPropositionId } from "../src/utils/markets";

describe("making marketId tests", () => {
  it("should return correctly formatted id for given date", () => {
    const result = makeMarketId(
      new Date("2021-01-01"),
      "ASC",
      "1",
      "W"
    );
    expect(result).toEqual("018628ASCW01");

    const resultTwo = makeMarketId(
      new Date("2022-12-08 23:00:00"),
      "DBN",
      "1",
      "W"
    );
    expect(resultTwo).toEqual("019334DBNW01");

    const resultThree = makeMarketId(
      new Date("2022-12-09 1:00:00"),
      "DBN",
      "1",
      "W"
    );
    expect(resultThree).toEqual("019335DBNW01");
  });
});

describe("propositionId tests", () => {
  it("should get the marketId from the propositionId", () => {
    const propositionId = "019508DBN08W07";
    const marketId = getMarketIdFromPropositionId(propositionId);

    expect(marketId).toEqual("019508DBN08W");
  });
});
