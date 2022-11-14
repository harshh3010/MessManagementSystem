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

exports.getDateFrom24HourTimeString = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};
