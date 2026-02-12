const CalendarIcon = ({className} : {className?: string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 2v4"></path>
      <path d="M17 2v4"></path>
      <rect width="19" height="18" x="3" y="4" rx="2"></rect>
      <path d="M4 10h18"></path>
    </svg>
  )
}

export default CalendarIcon
