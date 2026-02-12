import CustomRadioButton from './customs/RadioButton'
import UserAdditionIcon from './icons/UserAdditionIcon'
import {useState} from 'react'

const RegistrationHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container orange-tag">
        <UserAdditionIcon />
      </div>
      <h1 className='header-title'>Register to Play</h1>
      <p className="text" id="text-center">
        Fill out the form below to reserve your spot in the upcoming game.
      </p>
    </div>
  )
}

const RegistrationForm = () => {
  const currentOptions: {playerStatus: string; text: string; isSelected: boolean; style: string}[] = [
    {playerStatus: 'Confirmed Player', text: 'I will definitely attend this game', isSelected: false, style: 'confirmed-player'},
    {playerStatus: 'Potential Player', text: "I'm not sure yet, but count me in for now", isSelected: false, style: 'potential-player'},
  ]

  const [options, setOptions] = useState<{playerStatus: string; text: string; isSelected: boolean; style: string}[]>(currentOptions)
  const selectedOption = options.find((option) => option.isSelected)

  const handleRadioChange = (playerStatus: string) => {
    return setOptions(
      options.map((option) =>
        option.playerStatus === playerStatus
          ? !option.isSelected
            ? {...option, isSelected: !option.isSelected}
            : option
          : option.isSelected
            ? {...option, isSelected: false}
            : option,
      ),
    )
  }
  return (
    <form className="register-form-card">
      <div className="register-form-input-container">
        <span className="register-form-label">First Name *</span>
        <input className="register-form-input" type="text" placeholder="Your name"></input>
      </div>
      <div className="register-form-input-container">
        <span className="register-form-label">Player Status *</span>
        <div className="radio-container">
          {options.map(({playerStatus, text, isSelected, style}) => (
            <CustomRadioButton
              key={playerStatus}
              playerStatus={playerStatus}
              text={text}
              isSelected={isSelected}
              style={style}
              onChangeHandler={() => handleRadioChange(playerStatus)}
            />
          ))}
        </div>
      </div>
      <button className="button register-button" id={selectedOption?.style} onSubmit={(e) => e.preventDefault()}>
        Complete reservation
      </button>
    </form>
  )
}

const Registration = () => {
  return (
    <div className="section-container" id="odd-section">
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  )
}

export default Registration;