import CustomRadioButton, { type PlayerOptionProps } from './customs/RadioButton'
import UserAdditionIcon from './icons/UserAdditionIcon'
import {useState, type ChangeEvent} from 'react'
import SectionHeader from './SectionHeader'
import { Button } from './Button'
import type { GameEvent } from '@/types/GameEvent'

const RegistrationHeader = () => {
  return (
    <SectionHeader
      sectionIcon={{icon: <UserAdditionIcon/>}}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Register to Play'}
      description={'Fill out fhe form below to reserve your spot in the upcoming game.'}
    />
  )
}

const NameInput = ({
  gameEvent,
  isRegistered,
  name,
  onNameChangeHandler,
}: {
  gameEvent: GameEvent | undefined;
  isRegistered: boolean;
  name: string;
  onNameChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm sm:text-base font-medium">First Name:</label>
      <input
        className="text-sm sm:text-based dark:text-white dark:data-placeholder:text-muted-foreground hover:bg-accent dark:bg-input/30 dark:hover:bg-input/50 border border-solid border-neutral-300 dark:border-input rounded-md p-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400 disabled:cursor-not-allowed"
        type="text"
        value={name}
        onChange={onNameChangeHandler}
        pattern="^[A-Za-z]*"
        placeholder="Your name"
        disabled={!gameEvent?.isAvailable || isRegistered}
      ></input>
    </div>
  );
};

const RadioButtons = ({ options }: { options: PlayerOptionProps[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm sm:text-base font-medium">Player Status:</span>
      <div className="flex flex-col gap-3">
        {options.map(({ playerStatus, text, isSelected, style, onChangeHandler }) => (
          <CustomRadioButton key={playerStatus} playerStatus={playerStatus} text={text} isSelected={isSelected} style={style} onChangeHandler={onChangeHandler} />
        ))}
      </div>
    </div>
  );
};

const Buttons = ({ selectedOption, isUserRegistrationAllowed }: { selectedOption: PlayerOptionProps | undefined; isUserRegistrationAllowed: () => boolean }) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        type="submit"
        extra={`text-xs sm:text-sm py-2 ${selectedOption ? selectedOption.style : `bg-white text-black disabled:opacity-30 disabled:border-neutral-500 disabled:cursor-not-allowed`}`}
        text="Complete Reservation"
        disabled={!isUserRegistrationAllowed()}
      />
      <Button extra={"text-white text-xs sm:text-sm py-2 bg-red-500/90 dark:bg-red-500"} text={"Cancel Registration"} />
    </div>
  );
};

const RegistrationCategory = ({
  title,
  description,
  boxStyle,
  titleStyle,
  textStyle,
  isActive,
}: {
  title: string;
  description: string;
  boxStyle: string;
  titleStyle?: string;
  textStyle: string;
  isActive: boolean;
}) => {
  return (
    isActive && (
      <div className={` space-y-2 p-4 border-2 rounded-lg border-solid ${boxStyle}`}>
        <h3 className={`text-sm sm:text-base font-bold whitespace-nowrap ${titleStyle ? `${titleStyle}` : `${textStyle}`}`}>{title}</h3>
        <p className={`max-w-140 text-xs sm:text-sm text-justify ${textStyle}`}>{description}</p>
      </div>
    )
  );
};

const NoticeBox = ({ gameEvent, isRegistered }: { gameEvent: GameEvent | undefined; isRegistered: boolean }) => {
  return (
    <div>
      <RegistrationCategory
        title={"Registration Successful"}
        description="You have a garanteed spot for the upcoming game. You can unregister at any time within the allowed window. (Please check out the rule' section about cancellation policy for more details"
        boxStyle="bg-green-100 dark:bg-green-900 border-green-500"
        textStyle="text-green-700 dark:text-green-300"
        isActive={isRegistered ? true : false}
      />
      <RegistrationCategory
        title={"Registration Open"}
        description="Registration are now open. Secure your place to take part in competitive and friendly basketball games."
        boxStyle="bg-orange-100 dark:bg-orange-900 border-orange-500"
        textStyle="text-orange-700 dark:text-orange-300"
        isActive={gameEvent?.isAvailable && !isRegistered ? true : false}
      />
      <RegistrationCategory
        title={"Registration Closed"}
        description="The schedule for the upcoming basketball session is currently full. The registration for the next game will be reopen the same day at the end of the session."
        boxStyle="bg-red-100 dark:bg-red-900 border-red-500"
        textStyle="text-red-700 dark:text-red-300"
        isActive={gameEvent && !gameEvent.isAvailable ? true : false}
      />
      <RegistrationCategory
        title={"Registration unavailable"}
        description="There is currently no scheduled game, registration will open again as soon as a game event is added to the schedule section"
        boxStyle="bg-gray-100 dark:bg-zinc-800 border-neutral-300 dark:border-neutral-500 sm:dark:border-neutral-800"
        titleStyle="dark:text-white"
        textStyle="text-zinc-500 dark:text-zinc-400"
        isActive={!gameEvent}
      />
    </div>
  );
};

const RegistrationForm = () => {
  const currentOptions : PlayerOptionProps[] = [
    { playerStatus: "Confirmed Player",text: "I will definitely attend this game", isSelected: false, style: "text-white bg-orange-500/90 dark:bg-orange-500",  onChangeHandler: () => handleRadioChange('Confirmed Player') },
    { playerStatus: "Potential Player", text: "I'm not sure yet, but count me in for now", isSelected: false, style: "text-white bg-blue-500 dark:bg-blue-600" , onChangeHandler: () => handleRadioChange('Confirmed Player') },
  ]

  const [options, setOptions] = useState<PlayerOptionProps[]>(currentOptions);
  const selectedOption = options.find((option) => option.isSelected);

  const handleRadioChange = (playerStatus: string) => {
    return setOptions(
      options.map((option) =>
        option.playerStatus === playerStatus ? (!option.isSelected ? { ...option, isSelected: !option.isSelected } : option) : option.isSelected ? { ...option, isSelected: false } : option,
      ),
    );
  };
  return (
    <form className="text-black dark:text-white bg-white dark:bg-black flex flex-col gap-8 border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-md">
      <Button extra={`px-[8vw] py-2 shadow-md ${selectedOption ? selectedOption.style : `text-black bg-neutral-50`} `} text="Complete Reservation" />
    </form>
  );
};

const Registration = () => {
  return (
    <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8" >
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  )
}

export default Registration
