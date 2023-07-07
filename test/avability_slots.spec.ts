import { generateSlotByDailyAvability } from "@/avability_slots";
import { generateSlots } from "@/generate_slots";
import { DailyAvability, TemporalEvent } from "@/types";
import dayjs from "dayjs";

describe("avability_slot suite", () => {
  it("should create 5 slot", () => {
    const from = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-02T00:00:00.000Z").toDate();
    const midnight = dayjs("2023-07-01T00:00:00.000Z").toDate();
    const noon = dayjs("2023-07-01T12:00:00.000Z").toDate();
    const events: TemporalEvent[] = [{ start: midnight, end: noon }];
    const avabilites: DailyAvability[] = [
      { dayOfWeek: 6, start: 9 + 2, end: 13 + 2 },
      { dayOfWeek: 6, start: 14 + 2, end: 18 + 2 },
    ];
    const slots = generateSlotByDailyAvability(from, to, avabilites, events);
    expect(Array.from(slots)).toHaveLength(5);
  });
});
