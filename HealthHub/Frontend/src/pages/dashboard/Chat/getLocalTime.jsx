export const getLocalTime = (utcDateString) => {
  const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
  const utcDate = new Date(utcDateWithoutMillis);
  const localTime = new Date(utcDate);

  const formatter = new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Bucharest",
  });
  const localTimeString = formatter.format(localTime);
  return localTimeString;
};
