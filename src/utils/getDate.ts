export const getDate = (days: number = 0) => {
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const date = new Date(Date.now() + days * millisecondsInADay);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};
