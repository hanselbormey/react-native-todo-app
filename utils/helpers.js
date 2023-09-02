function isToday(date) {
  if (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getYear() === new Date().getYear()
  )
    return true;

  return false;
}

function getTodayTodos(data) {
  return data
    ?.filter((item) => isToday(item.date))
    .sort((a, b) => a.isCompleted - b.isCompleted);
}

function getUpcomingTodos(data) {
  return data
    ?.filter((item) => !isToday(item.date))
    .sort((a, b) => a.isCompleted - b.isCompleted);
}

export { isToday, getTodayTodos, getUpcomingTodos };
