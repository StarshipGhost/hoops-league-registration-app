import type {GameEvent} from '../../types/GameEvent'
import type {Player} from '../../types/Player'
import ScheduleModal from '../modals/ScheduleModalForm'
import DeleteScheduleModal from '../modals/DeleteScheduleModal'
import CalendarIcon from '../icons/CalendarIcon'
import LocationIcon from '../icons/LocationIcon'
import ClockIcon from '../icons/ClockIcon'
import UsersIcon from '../icons/UsersIcon'
import { getStringDateParts } from '../../utils/timeString'
import React, {Activity, useState} from 'react'
import { OrangeButton } from '../customs/Button'
import SectionHeader from '../customs/SectionHeader'
import type {Location} from '@/types/Location'
import { isGameAvailable } from '../../utils/scheduleUtils'
import { useHeaderContext } from '../customs/HeaderContext'

import lightEdit from '../../assets/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import lightDelete from '../../assets/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import darkEdit from '../../assets/edit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import darkDelete from '../../assets/delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

import darkOpenLock from '../../assets/lock_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import darkClosedLock from  '../../assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import lightOpenLock from '../../assets/lock_open_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import lightClosedLock from '../../assets/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

export interface GameInfoLineProps {
  icon: React.ReactNode,
  text: string,
  isLink: boolean,
  link?: string
}

const ScheduleHeader = () => {
  return (
    <SectionHeader
      sectionIcon={{icon: <CalendarIcon className="text-orange-500/90 dark:text-orange-400 size-6" />}}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Weekly Schedule'}
      description={'Check out our weekly games and reserve your spot. The schedule is updated regularly!'}
    />
  )
}

export const GameInfoLine = ({icon, text, isLink, link} : GameInfoLineProps) => {
  const textStyle = "text-sm dark:text-white";
  const linkStyle = "text-sm text-orange-500/90 underline dark:text-orange-400"
  return (
      <div className="flex items-center gap-1.5">
        {icon}
        {isLink ? <a className={linkStyle} href={link}>{text}</a> : <span className={textStyle}>{text}</span>} 
      </div>
  )
}

const CardHeader = ({
  gameEvent,
  isNextGame,
  updateGame,
  deleteGame,
  updateRegistrationsStatus,
}: {
  gameEvent: GameEvent;
  updateGame: (gameEvent: GameEvent) => void;
  isNextGame: boolean;
  deleteGame: (gameEvent: GameEvent) => void;
  updateRegistrationsStatus: (gameEvent: GameEvent) => void
}) => {
  const { theme: { darkMode }, admin: { isAdmin }, } = useHeaderContext();
  const { date , openRegistrations} = gameEvent;
  const color: string = isGameAvailable(gameEvent) && isNextGame && openRegistrations
    ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900 "
    : "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900 ";
  const {dayOfWeek, literalMonth, dayOfMonth, year} = getStringDateParts(date.toString());
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold dark:text-neutral-50 mb-1.5">{dayOfWeek}</h2>
        <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 whitespace-nowrap">{`${literalMonth} ${dayOfMonth}, ${year}`}</div>
      </div>
      <div className="flex flex-row-reverse flex-wrap gap-4">
        <div className={`text-sm sm:text-base text-center h-fit rounded-md font-bold px-3 py-1 border border-solid border-neutral-200 dark:border-neutral-800 ${color}`} >
          <span>{isGameAvailable(gameEvent) ? (isNextGame && openRegistrations ? "OPEN" : "CLOSED") : "FULL"}</span>
        </div>
        <Activity mode={isAdmin ? "visible" : 'hidden'}>
          <div className="flex flex-end items-start gap-4">
            <a onClick={() => updateRegistrationsStatus(gameEvent)}>
              <img 
                src={darkMode ? (openRegistrations ? lightClosedLock : lightOpenLock) : openRegistrations ? darkClosedLock : darkOpenLock}
                className="size-9 sm:size-10 cursor-pointer p-2 hover:bg-orange-100/50 dark:hover:bg-zinc-800 rounded-full"
              ></img>
            </a>
            <a onClick={() => updateGame(gameEvent)}>
              <img
                src={darkMode ? darkEdit : lightEdit}
                className="size-9 sm:size-10 cursor-pointer p-2 hover:bg-orange-100/50 dark:hover:bg-zinc-800 rounded-full"
              ></img>
            </a>
            <a onClick={() => deleteGame(gameEvent)}>
              <img
                src={darkMode ? darkDelete : lightDelete}
                className="size-9 sm:size-10 cursor-pointer p-2 hover:bg-red-100/50 dark:hover:bg-zinc-800 rounded-full"
              ></img>
            </a>
          </div>
        </Activity>
      </div>
    </div>
  );
};

const CardGameInfo = ({gameEvent}: {gameEvent: GameEvent}) => {
  const { start, end, location: {name, link}, registeredPlayers, capacity } = gameEvent
  return (
    <div className="min-w-30 flex flex-col gap-3">
      <GameInfoLine icon={<ClockIcon className='text-zinc-500 dark:text-zinc-400 size-4'/>} text={`${start} - ${end}`} isLink={false}/>
      <GameInfoLine icon={<LocationIcon className="text-zinc-500 flex-none dark:text-zinc-400 size-4" />} text={name} isLink={true} link={link}/>
      <GameInfoLine icon={<UsersIcon className='text-zinc-500 dark:text-zinc-400 size-4'/>} text={`${registeredPlayers.length} of ${capacity} spots available`} isLink={false}/>
    </div>
  )
}

const ProgressBar = ({confirmedPlayers, potentialPlayers, capacity}: {confirmedPlayers: Player[]; potentialPlayers: Player[]; capacity: number}) => {
  const orangeProgress = Math.min((confirmedPlayers.length / capacity) * 100, 100)
  const blueProgress = Math.min((potentialPlayers.length / capacity) * 100, 100)
  const progressBorder = () => {
    if (orangeProgress === 0) {
      return `rounded-tl rounded-bl`
    } else if (orangeProgress === 100) {
      return `rounded-tr rounded-br`
    }
  }
  return (
    <div className="bg-neutral-200 h-2 flex rounded dark:bg-neutral-700">
      <div className={`bg-orange-500/90 dark:bg-orange-500 h-2 flex  ${progressBorder()} rounded-tl rounded-bl`} style={{width: `${orangeProgress}%`}}></div>
      <div className={`bg-blue-500 dark:bg-blue-600 h-2 ${progressBorder()} flex rounded-tr rounded-br`} style={{width: `${blueProgress}%`}}></div>
    </div>
  )
}

const Legend = ({confirmedPlayers, potentialPlayers}: {confirmedPlayers: Player[]; potentialPlayers: Player[]}) => {
  return (
    <div className="flex flex-wrap my-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="size-3 rounded-full bg-orange-500/90 dark:bg-orange-500"></div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">{`Confirmed Players 🞗 ${confirmedPlayers.length}`}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="size-3 rounded-full bg-blue-500 dark:bg-blue-600"></div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">{`Potential Players 🞗 ${potentialPlayers.length}`}</div>
      </div>
    </div>
  )
}

const CardFooter = ({ gameEvent, isNextGame }: { gameEvent: GameEvent; isNextGame: boolean }) => {
  const { registeredPlayers, capacity, openRegistrations } = gameEvent;
  const { confirmed, potential } = Object.groupBy(registeredPlayers, (registeredPlayers) =>
    registeredPlayers.status === "Confirmed Player" ? "confirmed" : "potential",
  );
  const {scrollFunction} = useHeaderContext();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Registered Players</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{Math.round((registeredPlayers.length / capacity) * 100)}% </span>
      </div>
      <ProgressBar confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} capacity={capacity} />
      <Legend confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} />
      <div className='flex justify-end'>
        <OrangeButton extra="px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed" text="Join Game" onClick={() => scrollFunction(5)} disabled={!isNextGame || !isGameAvailable(gameEvent) || !openRegistrations} />
      </div>
    </div>
  );
};

const ScheduleCard = ({
  gameEvent,
  isNextGame,
  updateGame,
  deleteGame,
  updateRegistrationsStatus,
}: {
  gameEvent: GameEvent;
  isNextGame: boolean;
  updateGame: (gameEvent: GameEvent) => void;
  deleteGame: (gameEvent: GameEvent) => void;
  updateRegistrationsStatus: (gameEvent: GameEvent) => void
}) => {
  return (
    <div className="flex flex-col gap-4 p-5 border border-solid sm:border-neutral-300 dark:border-neutral-500 sm:dark:border-neutral-800 bg-white dark:bg-black  rounded-2xl shadow-md hover:shadow-xl">
      <CardHeader gameEvent={gameEvent} isNextGame={isNextGame} updateGame={updateGame} deleteGame={deleteGame} updateRegistrationsStatus={updateRegistrationsStatus} />
      <CardGameInfo gameEvent={gameEvent} />
      <CardFooter gameEvent={gameEvent} isNextGame={isNextGame} />
    </div>
  );
};

const Schedule = ({
  schedule,
  addGameEvent,
  updateGameEvent,
  deleteGameEvent,
  updateRegistrationStatus
}: {
  schedule: GameEvent[];
  addGameEvent: (date: Date, start: string, end: string, location: Location, capacity: number, openRegistrations: boolean) => void;
  updateGameEvent: (gameEvent: GameEvent, date: Date, start: string, end: string, location: Location, capacity: number) => void;
  deleteGameEvent: (gameEvent: GameEvent) => void
  updateRegistrationStatus: (gameEvent: GameEvent) => void;
}) => {
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [deleteGameModal, setDeleteGameModal] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<GameEvent | null>(null);
  const {admin : { isAdmin }} = useHeaderContext();

  const addGameToSchedule = (date: Date, start: string, end: string, location: Location, capacity: number): void => {
    addGameEvent(date, start, end, location, capacity, true);
    closeModal();
  };

  const updateGameSchedule = (date: Date, start: string, end: string, location: Location, capacity: number) => {
    if (editingEvent) {
      updateGameEvent(editingEvent, date, start, end, location, capacity);
      closeModal();
    }
  };

  const deleteGameFromSchedule = () => {
    if (deletingEvent) {
      deleteGameEvent(deletingEvent);
      closeModal();
    }
  }

  const openCreateModal = () => {
    setScheduleModal(true);
    setEditingEvent(null);
  };

  const openEditModal = (gameEvent: GameEvent) => {
    setScheduleModal(true);
    setEditingEvent(gameEvent);
  };

  const openDeleteModal = (gameEvent: GameEvent) => {
    setDeleteGameModal(true);
    setDeletingEvent(gameEvent)
  }

  const closeModal = () => {
    setDeleteGameModal(false)
    setScheduleModal(false);
    setEditingEvent(null);
  };

  return (
    <section className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8">
      <ScheduleHeader />
      <ScheduleModal
        isActive={scheduleModal}
        editingEvent={editingEvent}
        closeModal={closeModal}
        addGameEvent={addGameToSchedule}
        updateGameEvent={updateGameSchedule}
      />
      <DeleteScheduleModal isActive={deleteGameModal} closeModal={closeModal} deleteGameEvent={deleteGameFromSchedule}/>
      {isAdmin && <OrangeButton extra="px-4 py-2 sm:px-6 sm:py-2" text="Create New Game Event" onClick={openCreateModal} /> }
      <div className="w-full grid grid-cols-1 justify-center gap-8 lg:grid-cols-2">
        {schedule.map((schedule, index) => (
              <ScheduleCard 
                  key={index} 
                  gameEvent={schedule} 
                  isNextGame={index === 0} 
                  updateGame={openEditModal} 
                  deleteGame={openDeleteModal} 
                  updateRegistrationsStatus={updateRegistrationStatus} />
            ))}
      </div>
    </section>
  );
};

export default Schedule
