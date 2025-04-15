import dayjs from 'dayjs';

export const stringDateFormatted = (unformatedDate: string) => {
  const newDate = dayjs(unformatedDate);
  if (!newDate.isValid()) {
    return unformatedDate;
  }
  return newDate.format('D/M/YYYY, HH:mm');
};

export const formatDay = (date: Date, format: string) => {
  const newDate = dayjs(date);
  return newDate.format(format);
};
