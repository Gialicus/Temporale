export function isBefore(start: Date, end: Date) {
  return start.getTime() < end.getTime();
}
