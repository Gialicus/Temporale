import { TemporalEvent, TemporalOption } from "@/types";
import dayjs from "dayjs";

export function dateByAvability(slot: TemporalEvent, hour: number) {
  return dayjs(slot.start).startOf("date").add(hour, "hour").toDate();
}
export function addTimeToDate(date: Date, options: TemporalOption) {
  return dayjs(date).add(options.duration, options.unit).toDate();
}
export function subtractTimeToDate(date: Date, options: TemporalOption) {
  return dayjs(date).subtract(options.duration, options.unit).toDate();
}
