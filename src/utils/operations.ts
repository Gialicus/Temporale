import dayjs from "dayjs";
import { TemporalEvent } from "../types";
import { addTimeToDate, subtractTimeToDate } from "./dates";

export function addMinutes(minutes: number) {
  return function* (slots: Generator<TemporalEvent>) {
    for (const slot of slots) {
      const newSlot: TemporalEvent = {
        start: addTimeToDate(slot.start, { duration: minutes, unit: "minute" }),
        end: addTimeToDate(slot.end, { duration: minutes, unit: "minute" }),
      };
      yield newSlot;
    }
  };
}
export function subtractMinutes(minutes: number) {
  return function* (slots: Generator<TemporalEvent>) {
    for (const slot of slots) {
      const newSlot: TemporalEvent = {
        start: subtractTimeToDate(slot.start, {
          duration: minutes,
          unit: "minute",
        }),
        end: dayjs(slot.end).subtract(minutes, "minute").toDate(),
      };
      yield newSlot;
    }
  };
}

export function nearMargin(minutes: number) {
  return function* (slots: Generator<TemporalEvent>) {
    for (const slot of slots) {
      const newSlot: TemporalEvent = {
        start: dayjs(slot.start).add(minutes, "minute").toDate(),
        end: dayjs(slot.end).subtract(minutes, "minute").toDate(),
      };
      yield newSlot;
    }
  };
}

export function* mergeSlot(slots: Generator<TemporalEvent>) {
  const head: TemporalEvent = slots.next().value;
  let result = { ...head };
  for (const slot of slots) {
    const newSlot: TemporalEvent = {
      start: head.start,
      end: slot.end,
    };
    result = newSlot;
    yield newSlot;
  }
  return result;
}
