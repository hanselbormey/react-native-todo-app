function isToday(date) {
  if (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getYear() === new Date().getYear()
  )
    return true;

  return false;
}

export { isToday };
