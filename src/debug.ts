import dayjs from "dayjs";
import { generateDailySlotByWeeklyAvability } from "./avability_slots";
import { addMinutes, nearMargin, subtractMinutes } from "./utils/operations";
const from = dayjs("2023-07-01T00:00:00.000Z").toDate();
const to = dayjs("2023-07-31T00:00:00.000Z").toDate();
const slots = generateDailySlotByWeeklyAvability(from, to, [
  { day: 6, start: 8, end: 14 },
]);
const slotShifted = addMinutes(30)(slots);
const slotUndo = subtractMinutes(30)(slotShifted);
const slotWithMargin = nearMargin(15)(slotUndo);
for (const slot of slotWithMargin) {
  console.log(slot);
}
