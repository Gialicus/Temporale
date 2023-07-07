import { generateSlots } from "@/generate_slots";
import { TemporalEvent } from "@/types";
import { addMinutes, subtractMinutes } from "@/utils";
import dayjs from "dayjs";
describe("operation suite", () => {
  it("add and subtract 10 minutes to slot", () => {
    const from = dayjs("2023-07-03T00:00:00.000Z").toDate();
    const to = dayjs("2023-07-04T00:00:00.000Z").toDate();
    const toCompare = [...generateSlots(from, to)];
    const slots = [
      ...subtractMinutes(10)(addMinutes(10)(generateSlots(from, to))),
    ];
    for (let i = 0; i < toCompare.length; i++) {
      expect(slots[i].start.getTime()).toBe(toCompare[i].start.getTime());
      expect(slots[i].end.getTime()).toBe(toCompare[i].end.getTime());
    }
  });
});
