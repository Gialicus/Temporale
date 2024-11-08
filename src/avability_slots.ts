import { DailyAvability, TemporalEvent } from "./types";
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
  // console.log(
  //   `${rangeStart.toISOString()} <=>  ${slot.start.toISOString()} <=> ${rangeEnd.toISOString()} = ${isValid}`
  // );
  return isValid;
}

export function* generateSlotByDailyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInHours: number = 1
) {
  if (avabilites.length === 0) {
    yield* generateSlots(from, to, exclude, {
      duration: durationInHours,
      unit: "hour",
    });
  }
  for (const avability of avabilites) {
    assertAvability(avability);
    for (const slot of generateSlots(from, to, exclude, {
      duration: durationInHours,
      unit: "hour",
    })) {
      if (slot.start.getDay() !== avability.dayOfWeek) continue; //non è lo stesso giorno quindi lo slot non è valido
      const isValid = checkSlot(slot, avability);
      if (isValid) yield slot;
    }
  }
}

export function* generateSlotByWeeklyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInDays: number = 1
) {
  if (avabilites.length === 0) {
    yield* generateSlots(from, to, exclude, {
      duration: durationInDays,
      unit: "day",
    });
  }
  for (const slot of generateSlots(from, to, exclude, {
    duration: durationInDays,
    unit: "day",
  })) {
    for (const avability of avabilites) {
      assertAvability(avability);
      if (slot.start.getDay() !== avability.dayOfWeek) continue; //non è lo stesso giorno quindi lo slot non è valido
      const temporalEvent: TemporalEvent = {
        start: dateByAvability(slot, avability.start),
        end: dateByAvability(slot, avability.end),
      };
      yield temporalEvent;
    }
  }
}

export function* generateMinutesSlotByDailyAvability(
  from: Date,
  to: Date,
  avabilites: DailyAvability[],
  exclude: TemporalEvent[] = [],
  durationInMinutes: number = 5
) {
  if (avabilites.length === 0) {
    yield* generateSlots(from, to, exclude, {
      duration: durationInMinutes,
      unit: "minute",
    });
  }
  for (const avability of avabilites) {
    assertAvability(avability);
    for (const slot of generateSlots(from, to, exclude, {
      duration: durationInMinutes,
      unit: "minute",
    })) {
      if (slot.start.getDay() !== avability.dayOfWeek) continue; //non è lo stesso giorno quindi lo slot non è valido
      const isValid = checkSlot(slot, avability);
      if (isValid) yield slot;
    }
  }
}
