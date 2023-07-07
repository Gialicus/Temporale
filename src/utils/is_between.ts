import { TemporalEvent } from "../types";

export function isBetween(date: Date, event: TemporalEvent) {
  const sameStart = date.getTime() === event.start.getTime();
  const afterStart = date.getTime() > event.start.getTime();
  const beforeEnd = date.getTime() < event.end.getTime();
  return (sameStart || afterStart) && beforeEnd;
}
