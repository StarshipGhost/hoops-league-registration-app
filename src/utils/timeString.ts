export const timeString = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const cardDateFormat = (date: Date) => {
  return `${days[date.getDay()]} 🞗 ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const registrationTimeFormat = (date : Date) : string | undefined => {
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} at ${date.getHours()}:${date.getMinutes()}`
  }
}
