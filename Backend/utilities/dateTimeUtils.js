/**
 * Function to validate a 24hr time string in (HH:MM format)
 */
exports.validate24HourTimeString = (timeString) => {
  return (
    timeString.search(/^\d{2}:\d{2}$/) != -1 &&
    timeString.substr(0, 2) >= 0 &&
    timeString.substr(0, 2) <= 24 &&
    timeString.substr(3, 2) >= 0 &&
    timeString.substr(3, 2) <= 59 &&
    timeString.substr(6, 2) >= 0 &&
    timeString.substr(6, 2) <= 59
  );
};

/**
 * Function to generate a date object from a 24hr time string (HH:MM format)
 */
exports.getDateFrom24HourTimeString = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

exports.get24HourTimeStringFromDate = (date) => {
  var hours = date.getHours().toString();
  var minutes = date.getMinutes().toString();
  if (hours.length === 1) hours = `0${hours}`;
  if (minutes.length === 1) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};
