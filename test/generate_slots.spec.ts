import { generateSlots } from "@/generate_slots";
import dayjs from "dayjs";

describe("generate_slot suite", () => {
  it("should create 24 slot", () => {
    const from = dayjs("2023-07-03T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-04T00:00:00.000Z").toDate();
    const slots = generateSlots(from, to);
    let count = 0;
    for (const _ of slots) {
      count += 1;
    }
    expect(count).toBe(24);
  });
  it("should create 31 daily slot", () => {
    const from = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const to = dayjs("2023-08-01T00:00:00.000Z").toDate();
    const slots = generateSlots(from, to, [], {
      duration: 1,
      unit: "day",
    });
    let count = 0;
    for (const _ of slots) {
      count += 1;
    }
    expect(count).toBe(31);
  });
  it("should create 12 hours slots", () => {
    const midnight = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const midnightNextDay = dayjs("2023-07-02T00:00:00.000Z").toDate();
    const slots = generateSlots(
      midnight,
      midnightNextDay,
      [
        {
          start: dayjs("2023-07-01T00:00:00.000Z").toDate(),
          end: dayjs("2023-07-01T12:00:00.000Z").toDate(),
        },
      ],
      {
        duration: 1,
        unit: "hour",
      }
    );
    let count = 0;
    for (const _ of slots) {
      count += 1;
    }
    expect(count).toBe(12);
  });
});
