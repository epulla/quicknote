export const parseDateToUTC = (date: Date): Date => {
  return new Date(date.toUTCString());
};

export const getTimeDifference = (date1: Date, date2: Date) => {
  const milliseconds = date1.valueOf() - date2.valueOf();
  const secs = Math.floor(Math.abs(milliseconds) / 1000);
  const mins = Math.floor(secs / 60);
  return {
    secs,
    mins
  }
};
