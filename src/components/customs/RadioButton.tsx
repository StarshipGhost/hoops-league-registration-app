interface CustomRadioButtonProps {
  playerStatus: string
  text: string
  isSelected: boolean
  style: string
  onChangeHandler: () => void
}

const CustomRadioButton = ({playerStatus, text, isSelected, style, onChangeHandler}: CustomRadioButtonProps) => {
  return (
    <a className={`border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center gap-4 p-4 cursor-pointer mb-4 ${isSelected && style}`} onClick={onChangeHandler} >
      <div className="size-6 bg-white border border-solid border-neutral-200 dark:border-neutral-800 rounded-full flex flex-none items-center justify-center">
        {isSelected && <div className={ `size-3.5 rounded-full ${isSelected && style}`}></div>}
      </div>
      <div className="flex flex-col">
        <span className="whitespace-nowrap">
          <b>{playerStatus}</b>
        </span>
        <span className={`${isSelected ? `${'text-white'}` : `text-zinc-500 dark:text-zinc-400`}`}>
          {text}
        </span>
      </div>
    </a>
  )
}

export default CustomRadioButton
