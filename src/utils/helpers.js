// @ts-check
/**
 *
 * @param {number} timeRemaining
 * @returns string
 */
export function formatRemainingTime(timeRemaining) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining - minutes * 60;
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}
