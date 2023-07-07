import dayjs from "dayjs";
import { TemporalEvent } from "../types";

export function addMinutes(minutes: number) {
  return function* (slots: Generator<TemporalEvent>) {
    for (const slot of slots) {
      const newSlot: TemporalEvent = {
        start: dayjs(slot.start).add(minutes, "minute").toDate(),
        end: dayjs(slot.end).add(minutes, "minute").toDate(),
      };
      yield newSlot;
    }
  };
}
export function subtractMinutes(minutes: number) {
  return function* (slots: Generator<TemporalEvent>) {
    for (const slot of slots) {
      const newSlot: TemporalEvent = {
        start: dayjs(slot.start).subtract(minutes, "minute").toDate(),
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
