export function isValidLocation(location: string) {
  const regex = /^[A-Z]{3}$/;
  return regex.test(location);
}
