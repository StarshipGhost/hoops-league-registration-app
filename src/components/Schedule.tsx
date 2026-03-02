import type {GameEvent} from '../types/GameEvent'
import type {Player} from '../types/Player'
import ScheduleModal from './modals/ScheduleModalForm'
import CalendarIcon from './icons/CalendarIcon'
import LocationIcon from './icons/LocationIcon'
import ClockIcon from './icons/ClockIcon'
import UsersIcon from './icons/UsersIcon'
import {months, days} from '../utilities/timeString'
import React, {useState} from 'react'
import Button from './Button'
import SectionHeader from './SectionHeader'
import type {Location} from '@/types/Location'

const ScheduleHeader = () => {
  const sectionHeaderIcon: {icon: React.ReactNode} = {icon: <CalendarIcon className="text-orange-500/90 dark:text-orange-500 size-6" />}
  return (
    <SectionHeader
      sectionIcon={sectionHeaderIcon}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Weekly Schedule'}
      description={'Check out our weekly games and reserve your spot. The schedule is updated regularly!'}
    />
  )
}

const CardTopPart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {date, registeredPlayers, capacity} = gameEvent
  const isFull = (n: number) => n >= capacity
  const color: string = !isFull(registeredPlayers.length)
    ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900'
    : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900'
  return (
    <div className="flex justify-between">
      <div className="text-sm">
        <h2 className="text-xl font-bold dark:text-neutral-50 mb-1.5">{days[date.getDay()]}</h2>
        <div className="text-zinc-500 dark:text-zinc-400 mt-1">{`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</div>
      </div>
      <div className={`text-center h-fit rounded-lg font-bold px-3 py-1 border border-solid border-neutral-200 shadow dark:border-neutral-800 ${color}`}>
        <span>{isFull(registeredPlayers.length) ? 'FULL' : 'OPEN'}</span>
      </div>
    </div>
  )
}

const CardMiddlePart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {
    start,
    end,
    location: {name, link},
    registeredPlayers,
    capacity,
  } = gameEvent

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <ClockIcon className="text-zinc-500 dark:text-zinc-400 size-4" />
        <span className="text-sm dark:text-neutral-50">{`${start} - ${end}`}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <LocationIcon className="text-zinc-500 flex-none dark:text-zinc-400 size-4" />
        <span> <a className="text-sm text-orange-500/90 ml-1 underline dark:text-orange-400" href={link}> {name} </a> </span>
      </div>
      <div className="flex items-center gap-1.5">
        <UsersIcon className="text-zinc-500 dark:text-zinc-400 size-4" />
        <span className="text-sm dark:text-neutral-50 ml-1">{`${registeredPlayers.length} of ${capacity} spots available`}</span>
      </div>
    </div>
  )
}

const ProgressBar = ({confirmedPlayers, potentialPlayers, capacity}: {confirmedPlayers: Player[]; potentialPlayers: Player[]; capacity: number}) => {
  const orangeProgress = Math.min((confirmedPlayers.length / capacity) * 100, 100).toString()
  const blueProgress = Math.min((potentialPlayers.length / capacity) * 100, 100)
  return (
    <div className="bg-neutral-200 h-2 flex rounded dark:bg-neutral-700">
      <div className={`bg-orange-500/90 dark:bg-orange-500 h-2 flex  rounded-tl rounded-bl`} style={{width: `${orangeProgress}%`}}></div>
      <div className={`bg-blue-500 dark:bg-blue-600 h-2 flex rounded-tr rounded-br`} style={{width: `${blueProgress}%`}}></div>
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
        <div className="text-zinc-500 text-sm dark:text-zinc-400">{`Potential Players 🞗 ${potentialPlayers.length}`}</div>
      </div>
    </div>
  )
}

const CardBottomPart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {registeredPlayers, capacity} = gameEvent
  const {confirmed, potential} = Object.groupBy(registeredPlayers, (registeredPlayers) =>
    registeredPlayers.status === 'Confirmed Player' ? 'confirmed' : 'potential',
  )

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Registered Players</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{`${registeredPlayers.length}/${capacity}`}</span>
      </div>
      <ProgressBar confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} capacity={capacity} />
      <Legend confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} />
      <div className="flex justify-end">
        <Button extra="text-white bg-orange-500/90 dark:bg-orange-500 px-4 py-2" text="Join Game" />
      </div>
    </div>
  )
}

const ScheduleCard = ({gameEvent}: {gameEvent: GameEvent}) => {
  return (
    <div className="flex flex-col gap-4 p-5 border border-solid border-neutral-200 bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 rounded-2xl shadow-md">
      <CardTopPart gameEvent={gameEvent} />
      <CardMiddlePart gameEvent={gameEvent} />
      <CardBottomPart gameEvent={gameEvent} />
    </div>
  )
}

const Schedule = () => {
  const [scheduleModal, setScheduleModal] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<GameEvent[]>([])

  const addGameEvent = (date: Date, start: string, end: string, location: Location, capacity: number): void => {
    const newGameEvent: GameEvent = {date: date, start: start, end: end, location: location, registeredPlayers: [], capacity: capacity}
    setSchedule(schedule.concat(newGameEvent))
    setScheduleModal(false)
  }

  return (
    <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8">
      <ScheduleHeader />
      <ScheduleModal isActive={scheduleModal} handler={() => setScheduleModal((v) => !v)} addGameEvent={addGameEvent} />
      <Button extra="text-white bg-orange-500/90 dark:bg-orange-500 px-4 py-2 sm:px-6 sm:py-2" text="Create New Game Event" onClick={() => setScheduleModal((v) => !v)} />
      <div className="w-full grid grid-cols-1 justify-center gap-8 lg:grid-cols-2">
        {schedule.map((schedule, index) => (
          <ScheduleCard key={index} gameEvent={schedule} />
        ))}
      </div>
    </div>
  )
}

export default Schedule
