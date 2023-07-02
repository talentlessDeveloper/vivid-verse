import { Timestamp } from 'firebase/firestore';

export function getTimeElapsedString(elapsed: number) {
  // Helper function to format elapsed time as string
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (elapsed < minute) {
    return 'just now';
  } else if (elapsed < hour) {
    const minutes = Math.floor(elapsed / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (elapsed < day) {
    const hours = Math.floor(elapsed / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(elapsed / day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export const convertDate = (date: Timestamp) => {
  const createdAt = date.toDate(); // Convert serverTimestamp to Date object
  const elapsed = Date.now() - createdAt.getTime(); // Calculate time elapsed since post was created
  const elapsedString = getTimeElapsedString(elapsed);

  return elapsedString;
};
