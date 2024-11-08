import {
  generateMinutesSlotByDailyAvability,
  generateHourSlotByDailyAvability,
} from "@/avability_slots";
import { DailyAvability, TemporalEvent } from "@/types";
import dayjs from "dayjs";

describe("avability_slot suite", () => {
  it("should create 5 hour slot", () => {
    const from = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-02T00:00:00.000Z").toDate();
    const midnight = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const noon = dayjs("2023-07-01T12:00:00.000Z").toDate();
    const events: TemporalEvent[] = [{ start: midnight, end: noon }];
    const avabilites: DailyAvability[] = [
      { day: 6, start: 9 + 2, end: 13 + 2 },
      { day: 6, start: 14 + 2, end: 18 + 2 },
    ];
    const slots = generateHourSlotByDailyAvability(
      from,
      to,
      avabilites,
      events
    );
    expect(Array.from(slots)).toHaveLength(5);
  });

  it("should create 60 slot of 5 minute for 5 hours of avability", () => {
    const from = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-02T00:00:00.000Z").toDate();
    const midnight = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const noon = dayjs("2023-07-01T12:00:00.000Z").toDate();
    const events: TemporalEvent[] = [{ start: midnight, end: noon }];
    const avabilites: DailyAvability[] = [
      { day: 6, start: 9 + 2, end: 13 + 2 },
      { day: 6, start: 14 + 2, end: 18 + 2 },
    ];
    const slots = generateMinutesSlotByDailyAvability(
      from,
      to,
      avabilites,
      events
    );
    expect(Array.from(slots)).toHaveLength(60);
  });
});
