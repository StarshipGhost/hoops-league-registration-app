const Button = ({extra, text, onClick}: {extra: string; text: string; onClick?: () => void}) => {
  return (
    <button
      className={`text-sm font-medium border border-solid border-neutral-200 rounded-lg whitespace-nowrap cursor-pointer hover:brightness-90 dark:border-neutral-800 ${extra}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
