const CustomRadioButton = ({playerStatus, text, isSelected, style, onChangeHandler}: {playerStatus: string; text: string, isSelected: boolean, style: string, onChangeHandler: () => void}) => {
  return (
    <div className="radio-button-container" id={isSelected ? `${ style }` : ''} onClick={onChangeHandler}>
      <div className="radio-slot-circle">
        {isSelected && <div className="radio-circle" id={style}></div>}
      </div>
      <div className="radio-text-container" >
        <span style={{whiteSpace: 'nowrap'}}><b>{playerStatus}</b></span>
        <span className="text" style={{color: `${isSelected ? '#ffffff' : '#7c7c84'}`}}> {text} </span>
      </div>
    </div>
  )
}

export default CustomRadioButton
