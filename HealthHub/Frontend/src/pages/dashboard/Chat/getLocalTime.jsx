export const getLocalTime = (utcDateString) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
  const utcDate = new Date(utcDateWithoutMillis);
  const localTime = new Date(utcDate);

  const isToday = utcDate.toISOString().slice(0, 10) === currentDate;

  const formatter = new Intl.DateTimeFormat("ro-RO", {
    year: isToday ? undefined : "numeric",
    month: isToday ? undefined : "2-digit",
    day: isToday ? undefined : "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Bucharest",
  });
  const localTimeString = formatter.format(localTime);
  return localTimeString;
};
