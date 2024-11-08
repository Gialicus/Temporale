import { DailyAvability, TemporalEvent, TemporalOption } from "./types";
import { dateByAvability, isBetween } from "./utils";
import { generateSlots } from "./generate_slots";

function assertAvability(avability: DailyAvability) {
  if (avability.start >= avability.end) {
    throw new Error(
      `Start ${avability.start} cant be after End ${avability.end}`
    );
  }
}

function checkSlot(slot: TemporalEvent, avability: DailyAvability) {
  const rangeStart = dateByAvability(slot, avability.start);
  const rangeEnd = dateByAvability(slot, avability.end);
  const isValid = isBetween(slot.start, {
    start: rangeStart,
    end: rangeEnd,
  });
  return isValid;
}

export function* generateSlotByAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  options: TemporalOption = { duration: 1, unit: "hour" }
) {
  if (avabilites.length === 0) {
    yield* generateSlots(from, to, exclude, options);
  }
  for (const avability of avabilites) {
    assertAvability(avability);
    for (const slot of generateSlots(from, to, exclude, options)) {
      if (slot.start.getDay() !== avability.day) continue; //non è lo stesso giorno quindi lo slot non è valido
      const isValid = checkSlot(slot, avability);
      if (isValid) yield slot;
    }
  }
}

export function* generateHourSlotByDailyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInHours: number = 1
) {
  return yield* generateSlotByAvability(from, to, avabilites, exclude, {
    duration: durationInHours,
    unit: "hour",
  });
}

export function* generateDailySlotByWeeklyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInDays: number = 1
) {
  return yield* generateSlotByAvability(from, to, avabilites, exclude, {
    duration: durationInDays,
    unit: "day",
  });
}

export function* generateMinutesSlotByDailyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInMinutes: number = 5
) {
  return yield* generateSlotByAvability(from, to, avabilites, exclude, {
    duration: durationInMinutes,
    unit: "minute",
  });
}
