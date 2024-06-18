export function convertTimestampToYearsFrom2003(timestamp: number): number {
  // Unix timestamp for September 12, 2003
  const startTimestamp = new Date("2003-09-12").getTime() / 1000;

  // Calculate the difference in seconds from September 12, 2003
  const secondsSince2003 = timestamp - startTimestamp;

  // Constants for conversion
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerYear = 365.25; // Average including leap years

  // Calculate seconds per year
  const secondsPerYear =
    secondsPerMinute * minutesPerHour * hoursPerDay * daysPerYear;

  // Convert timestamp to years since September 12, 2003
  const yearsSince2003 = secondsSince2003 / secondsPerYear;

  return yearsSince2003;
}
