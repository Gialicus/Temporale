import { isBetween } from "@/utils";
import dayjs from "dayjs";
describe("is_between suite", () => {
  it("event is between", () => {
    const from = dayjs("2023-07-03T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-04T00:00:00.000Z").toDate();
    const bet = dayjs("2023-07-03T12:00:00.000Z").toDate();
    expect(isBetween(bet, { start: from, end: to })).to.be.true;
  });
  it("event is not between", () => {
    const from = dayjs("2023-07-03T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-09T00:00:00.000Z").toDate();
    const bet = dayjs("2023-07-03T12:00:00.000Z").toDate();
    expect(isBetween(bet, { start: from, end: to })).to.be.true;
  });
});
