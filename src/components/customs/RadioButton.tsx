export interface PlayerOptionProps {
  playerStatus: 'Confirmed Player' | 'Potential Player' | undefined
  text: string 
  isSelected: boolean
  style: string
  onChangeHandler?: () => void
}

const CustomRadioButton = ({playerStatus, text, isSelected, style, onChangeHandler}: PlayerOptionProps) => {
  return (
    <a className={` border border-solid border-neutral-300 dark:border-input rounded-lg flex items-center gap-4 px-3 py-2 sm:px-4 sm:py-3  cursor-pointer hover:brightness-90 ${isSelected ? style : 'hover:bg-accent dark:bg-input/30 dark:hover:bg-input/50'}`} onClick={onChangeHandler} >
      <div className="size-4 sm:size-6 bg-white border border-solid border-neutral-300 dark:border-neutral-800 rounded-full flex flex-none items-center justify-center">
        {isSelected && <div className={ `size-2 sm:size-3.5 rounded-full ${isSelected && style}`}></div>}
      </div>
      <div className="flex flex-col gap-1">
        <span className={ `text-sm sm:text-base whitespace-nowrap ${isSelected && `text-white`}` }>
          <b>{playerStatus}</b>
        </span>
        <span className={`text-xs sm:text-sm ${isSelected ? `${'text-white'}` : `text-zinc-500 dark:text-zinc-400`}`}>
          {text}
        </span>
      </div>
    </a>
  )
}

export default CustomRadioButton
