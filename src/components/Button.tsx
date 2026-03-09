interface ButtonProps {
  extra: string,
  text: string,
  type?: 'submit' | 'reset' | 'button' | undefined,
  disabled?: boolean | undefined
  onClick?: () => void
}

const commonStyle = 'text-sm font-medium border border-solid border-neutral-200 dark:border-neutral-800 rounded-md whitespace-nowrap cursor-pointer transition duration-100 ease hover:brightness-90'
export const Button = ({extra, text, type, disabled, onClick} : ButtonProps) => {
  return <button className={`${commonStyle} ${extra}`} onClick={onClick} type={type} disabled={disabled}>{text}</button>
}

export const OrangeButton = ({ extra, text, type, onClick }: ButtonProps) => {
  return (
    <button className={`${commonStyle} text-white bg-orange-500/90 dark:bg-orange-500 ${extra}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export const WhiteButton = ( { extra, text, type, onClick }: ButtonProps ) => {
  return (
    <button className={ `${commonStyle} text-black bg-white shadow-md ${extra}` } onClick={onClick} type={type} >{text}</button>
  )
}