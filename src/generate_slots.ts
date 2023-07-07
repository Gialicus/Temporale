import { TemporalEvent, TemporalOption } from "./types";
import { addTime, isBefore, isBetween } from "./utils";

function buildSlot(start: Date, options: TemporalOption): TemporalEvent {
  return {
    start: start,
    end: addTime(start, options),
  };
}

function excludeEvents(exclude: TemporalEvent[], start: Date) {
  return exclude.filter((temporalEvent) => isBetween(start, temporalEvent));
}

export function* generateSlots(
  from: Date,
  to: Date,
  exclude: TemporalEvent[] = [],
  options: TemporalOption = {
    duration: 1,
    unit: "hour",
  }
) {
  let start = new Date(from);
  while (isBefore(start, to)) {
    const slot: TemporalEvent = buildSlot(start, options);
    const toExclude = excludeEvents(exclude, start);
    if (toExclude.length === 0) {
      yield slot;
    }
    start = addTime(start, options);
  }
}
