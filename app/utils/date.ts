import dayjs from 'dayjs';

export const stringDateFormated = (unformatedDate: string) => {
  const newDate = dayjs(unformatedDate);
  if (!newDate.isValid()) return unformatedDate;
  return newDate.format('D/M/YYYY, HH:mm');
}