import CustomRadioButton, { type PlayerOptionProps } from "./customs/RadioButton";
import UserAdditionIcon from "./icons/UserAdditionIcon";
import { useState, type ChangeEvent } from "react";
import SectionHeader from "./SectionHeader";
import { Button } from "./Button";
import type { GameEvent } from "@/types/GameEvent";
import type { Player } from "@/types/Player";

const RegistrationHeader = () => {
  return (
    <SectionHeader
      sectionIcon={{ icon: <UserAdditionIcon /> }}
      iconBg={"bg-orange-500/10 dark:bg-orange-500/20"}
      title={"Register to Play"}
      description={"Fill out fhe form below to reserve your spot in the upcoming game."}
    />
  );
};

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

const RadioButtons = ({ options }: { options: PlayerOptionProps[], }) => {
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

const Buttons = ({
  selectedOption,
  isRegistered,
  player,
  isUserRegistrationAllowed,
  submitCancellation,
}: {
  selectedOption: PlayerOptionProps | undefined;
  isRegistered: boolean;
  player: Player | undefined;
  isUserRegistrationAllowed: () => boolean;
  submitCancellation: (player: Player) => void;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        type="submit"
        extra={`text-xs sm:text-sm py-2 ${selectedOption ? selectedOption.style : `bg-white text-black disabled:opacity-30 disabled:border-neutral-500 disabled:cursor-not-allowed`}`}
        text="Complete Reservation"
        disabled={!isUserRegistrationAllowed()}
      />
      {isRegistered && (
        <Button
          extra={"text-white text-xs sm:text-sm py-2 bg-red-500/90 dark:bg-red-500"}
          text={"Cancel Registration"}
          onClick={() => (player ? submitCancellation(player) : console.log("player doesn't exist"))}
        />
      )}
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
        boxStyle="bg-green-100 dark:bg-green-900/50 border-green-500"
        textStyle="text-green-700 dark:text-green-300"
        isActive={isRegistered ? true : false}
      />
      <RegistrationCategory
        title={"Registration Open"}
        description="Registration are now open. Secure your place to take part in competitive and friendly basketball games."
        boxStyle="bg-orange-100 dark:bg-orange-900/50 border-orange-500"
        textStyle="text-orange-700 dark:text-orange-300"
        isActive={gameEvent?.isAvailable && !isRegistered ? true : false}
      />
      <RegistrationCategory
        title={"Registration Closed"}
        description="The schedule for the upcoming basketball session is currently full. The registration for the next game will be reopen the same day at the end of the session."
        boxStyle="bg-red-100 dark:bg-red-900/50 border-red-500"
        textStyle="text-red-700 dark:text-red-300"
        isActive={gameEvent && !gameEvent.isAvailable && !isRegistered ? true : false}
      />
      <RegistrationCategory
        title={"Registration Unavailable"}
        description="There is currently no scheduled game, registration will open again as soon as a game event is added to the schedule section"
        boxStyle="bg-zinc-100 dark:bg-zinc-900/50 border-neutral-300 dark:border-zinc-500"
        titleStyle="dark:text-white"
        textStyle="text-zinc-500 dark:text-zinc-400"
        isActive={!gameEvent}
      />
    </div>
  );
};

const RegistrationForm = ({
  gameEvent,
  isRegistered,
  updateRegistrationStatus,
  gameEventRegistration,
  gameEventCancellation,
}: {
  gameEvent: GameEvent | undefined;
  isRegistered: boolean;
  updateRegistrationStatus: (value: boolean) => void;
  gameEventRegistration: (player: Player) => void;
  gameEventCancellation: (player: Player) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<"Confirmed Player" | "Potential Player" | undefined>();
  const currentOptions: PlayerOptionProps[] = [
    {
      playerStatus: "Confirmed Player",
      text: "I will definitely attend this game",
      isSelected: currentStatus === "Confirmed Player" && isUserRegistrationAllowed(),
      style: "text-white bg-orange-500/90 dark:bg-orange-500",
      onChangeHandler: () => handleRadioChange("Confirmed Player"),
    },
    {
      playerStatus: "Potential Player",
      text: "I'm not sure yet, but count me in for now",
      isSelected: currentStatus === "Potential Player" && isUserRegistrationAllowed(),
      style: "text-white bg-blue-500 dark:bg-blue-600",
      onChangeHandler: () => handleRadioChange("Potential Player"),
    },
  ];
  const selectedOption : PlayerOptionProps | undefined = currentOptions.find((option) => option.isSelected);

  function isUserRegistrationAllowed(): boolean {
    if (!gameEvent?.isAvailable || isRegistered) return false;
    return true;
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    const updatedName = e.currentTarget.value;
    setName(updatedName);
  };

  const handleRadioChange = (playerStatus: "Confirmed Player" | "Potential Player") : void => {
     setCurrentStatus(playerStatus);
  };

  const submitRegistration = (event: React.SubmitEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    if (isUserRegistrationAllowed() && name.length > 0 && currentStatus) {
      gameEventRegistration({firstName: name, status: currentStatus});
      updateRegistrationStatus(true);
    }
  };

  const submitCancellation = (player: Player) : void => {
      gameEventCancellation(player)
      updateRegistrationStatus(false)
      setCurrentStatus(undefined);
  }

  return (
    <form
      className="bg-white dark:bg-black flex flex-col gap-8 border border-solid border-neutral-300 dark:border-neutral-500 sm:dark:border-neutral-800 rounded-2xl p-8 shadow-md"
      onSubmit={submitRegistration}
    >
      <NameInput gameEvent={gameEvent} isRegistered={isRegistered} name={name} onNameChangeHandler={handleNameChange} />
      <RadioButtons options={currentOptions} />
      <Buttons selectedOption={selectedOption} isRegistered={isRegistered} player={{firstName: name, status: currentStatus ?? 'Confirmed Player'}} isUserRegistrationAllowed={isUserRegistrationAllowed} submitCancellation={submitCancellation} />
    </form>
  );
};

const Registration = ({
  gameEvent,
  gameEventRegistration,
  gameEventCancellation,
}: {
  gameEvent: GameEvent | undefined;
  gameEventRegistration: (player: Player) => void;
  gameEventCancellation: (player: Player) => void;
}) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8">
      <RegistrationHeader />
      <NoticeBox gameEvent={gameEvent} isRegistered={isRegistered} />
      <RegistrationForm
        gameEvent={gameEvent}
        isRegistered={isRegistered}
        updateRegistrationStatus={(value: boolean) => setIsRegistered(value)}
        gameEventRegistration={gameEventRegistration}
        gameEventCancellation={gameEventCancellation}
      />
    </div>
  );
};

export default Registration;
