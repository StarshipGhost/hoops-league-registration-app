import {useState} from 'react'
import type {Location} from '../../types/Location'
import TimePicker from '../customs/TimePicker'
import {getDateParts} from '../../utilities/timeString'
import Button from '../Button'

const GameDateInput = () => {
  const date: Date = new Date()
  const [dateFormat, setDateFormat] = useState<{year: string; month: string | undefined; day: string | undefined}>({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
  })

  const handleDateChange = (date: Date, event: React.ChangeEvent<HTMLInputElement>): void => {
    const [selectedYear, selectedMonth, selectedDay] = event.currentTarget.value.split('-')
    const {year, month, day} = getDateParts(date)
    const newDate = {
      year: selectedYear === '' ? year.toString() : selectedYear,
      month: selectedMonth ?? month.toString().padStart(2, '0'),
      day: selectedDay ?? day.toString().padStart(2, '0'),
    }
    setDateFormat(newDate)
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className="text-zinc-500 dark:text-zinc-400">Game date: </div>
      <input
        type="date"
        value={`${dateFormat.year}-${dateFormat.month}-${dateFormat.day}`}
        onChange={(e) => handleDateChange(date, e)}
      ></input>
    </div>
  )
}

const GameTimeInput = ({gameTime}: {gameTime: 'Starts' | 'Ends'}) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className="text-zinc-500 dark:text-zinc-400">{`${gameTime} at: `}</div>
      <TimePicker />
    </div>
  )
}

const GameCapacityInput = () => {
  return (
    <div className='flex gap-2'>
      <div className="text-zinc-500 dark:text-zinc-400">Capacity: </div>
      <input className='w-[65px] h-[30px] dark:text-white border border-solid border-neutral-400 dark:border-neutral-800 rounded-sm pl-2' type="number" min="0" max="30"></input>
    </div>
  )
}

const GameEventLocationDropdown = ({locations}: {locations: string[]}) => {
  const defaultLocation = locations[0]
  const [open, setOpen] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<string>(defaultLocation)
  return (
    <div className="scheduleDropdown">
      <div className="text-zinc-500 dark:text-zinc-400">Location: </div>
      <div className='relative flex justify-between items-center border border-solid border-neutral-400 dark:border-neutral-800 rounded-lg p-4 cursor-pointer box-shadow-md mt-1' onClick={() => setOpen((v) => !v)}>
        <div className='dark:text-white'> {currentLocation} </div>
        <span className={`w-0 h-0 border-t-6 border-t-solid border-t-black border-l-5 border-l-solid border-l-transparent border-r-5 border-r-solid border-r-transparent dark:border-t-white transition duration-200 ease-linear ${open && `rotate-180`}`}></span>
      </div>
      <ul className={`absolute border border-solid border-neutral-400 dark:border-neutral-800 rounded-lg p-3 bg-white dark:bg-black transition duration-200 ease-linear invisible opacity-0 ${open && 'flex flex-col flex-wrap visible opacity-100'}`}>
        {locations.map((location) => (
          <li
            key={location}
            className='p-2 dark:text-white cursor-pointer hover:bg-orange-500/10 hover:rounded-lg dark:hover:bg-orange-500/20'
            onClick={() => {
              setCurrentLocation(location)
              setOpen(false)
            }}
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  )
}

const GameButtonForm = ({handler}: {handler: () => void}) => {
  return (
    <div className="flex justify-between">
      <Button extra="bg-neutral-50 px-4 py-2 shadow-md" text="Cancel" onClick={handler} />
      <Button extra="text-white px-4 py-2 bg-orange-500/90 dark:bg-orange-500" text="Login" onClick={handler} />
    </div>
  )
}

const ScheduleModalForm = ({isActive, handler}: {isActive: boolean; handler: () => void}) => {
  const locations: Location[] = [
    {
      name: 'Complexe sportif du Collège Bois de Boulogne - 1er étage',
      link: 'https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    },
    {
      name: 'Complexe sportif du Collège Bois de Boulogne - 2e étage',
      link: 'https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    },
    {
      name: 'École Spécialisée | Victor-Doré',
      link: 'https://www.google.com/maps/place/1985+Rue+Victor+Dor%C3%A9,+Montr%C3%A9al,+QC+H3M+1S4/@45.5370461,-73.6908979,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc918816dcb2e81:0x9c09f7567d8965ec!8m2!3d45.5370461!4d-73.688323!16s%2Fg%2F11m62qjrw_?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    },
  ]

  return (
    <div className={`${isActive ? `flex` : `hidden`} flex justify-center items-center fixed top-0 w-full h-full z-1000 overflow-auto bg-[rgba(0,0,0,0.5)]`}>
      <div className="bg-white dark:bg-black w-[450px] flex flex-col gap-4 p-6 my-auto mx-3 rounded-xl border-box">
        <h2 className="dark:text-white">New Game Event</h2>
        <GameDateInput />
        <GameTimeInput gameTime="Starts" />
        <GameTimeInput gameTime="Ends" />
        <GameEventLocationDropdown locations={locations.map(({name}) => name)} />
        <GameCapacityInput />
        <GameButtonForm handler={handler} />
      </div>
    </div>
  )
}

export default ScheduleModalForm
