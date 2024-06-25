import {
  parseISO,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isValid,
} from 'date-fns';

export function timeSince(timestamp: string | Date): string {
  let timeStampDate: Date;

  if (typeof timestamp === 'string') {
    timeStampDate = parseISO(timestamp);
  } else if (timestamp instanceof Date) {
    timeStampDate = timestamp;
  } else {
    throw new TypeError(
      'Invalid input: timestamp must be a string or Date object'
    );
  }

  if (!isValid(timeStampDate)) {
    throw new Error('Invalid date');
  }

  const now = new Date();
  const minutesDifference = differenceInMinutes(now, timeStampDate);
  if (minutesDifference < 60) {
    return `${minutesDifference} minutes ago`;
  }

  const hoursDifference = differenceInHours(now, timeStampDate);
  if (hoursDifference < 24) {
    return `${hoursDifference} hours ago`;
  }

  const daysDifference = differenceInDays(now, timeStampDate);
  return `${daysDifference} days ago`;
}

const timestamp = '2024-06-17T13:23:57.472+00:00';
try {
  console.log(timeSince(timestamp));
} catch (error) {
  const err = error as Error;
  console.error(err.message);
}
