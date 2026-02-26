import CustomRadioButton from './customs/RadioButton'
import UserAdditionIcon from './icons/UserAdditionIcon'
import {useState} from 'react'
import SectionHeader from './SectionHeader'
import Button from './Button'

const RegistrationHeader = () => {
  const sectionHeaderIcon: {icon: React.ReactNode} = {icon: <UserAdditionIcon />}
  return (
    <SectionHeader
      sectionIcon={sectionHeaderIcon}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Register to Play'}
      description={'Fill out fhe form below to reserve your spot in the upcoming game.'}
    />
  )
}

const RegistrationForm = () => {
  const currentOptions: {playerStatus: string; text: string; isSelected: boolean; style: string}[] = [
    {playerStatus: 'Confirmed Player', text: 'I will definitely attend this game', isSelected: false, style: 'text-white bg-orange-500/90 dark:bg-orange-500'},
    {playerStatus: 'Potential Player', text: "I'm not sure yet, but count me in for now", isSelected: false, style: 'text-white bg-blue-500 dark:bg-blue-600'},
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
    <form className="text-black dark:text-white bg-white dark:bg-black flex flex-col gap-8 border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-md">
      <div className="flex flex-col gap-3">
        <span className="font-medium">First Name *</span>
        <input className="dark:text-white dark:bg-black border border-solid border-neutral-200 dark:border-neutral-800 rounded-lg p-2" type="max-w-md text-zinc-500 text-(length:--text-fluid)" placeholder="Your name"></input>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium">Player Status *</span>
        <div>
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
      <Button extra={ `px-[8vw] py-2 shadow-md ${selectedOption ? selectedOption.style : `text-black bg-neutral-50`} `} text='Complete Reservation' />
    </form>
  )
}

const Registration = () => {
  return (
    <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8" >
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  )
}

export default Registration
