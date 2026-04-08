export const timeString = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const cardDateFormat = (date: Date) : string => {
  return `${weekDays[date.getDay()]} 🞗 ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function getDateParts(date: Date) {
  const [dayOfWeek, dayOfMonth, month, year] = [
    date.toLocaleDateString("en-US", { weekday: "long" }),
    date.getDate(),
    date.toLocaleDateString("en-US", { month: "short" }),
    date.getFullYear(),
  ];

  return { dayOfWeek, dayOfMonth, month, year };
}

export function getStringDateParts(dateData: string) {
  const [year, month, dayOfMonth] = dateData.split('T')[0].split('-');
  const literalMonth = months[parseInt(month) - 1];
  const dayIndex = new Date(`${year}-${parseInt(month)}-${dayOfMonth}`).getDay()
  const dayOfWeek = weekDays[dayIndex];
  return {dayOfWeek, literalMonth, dayOfMonth, year};
}

export const registrationTimeFormat = (date : Date) : string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} at ${timeString(date)}`
}
