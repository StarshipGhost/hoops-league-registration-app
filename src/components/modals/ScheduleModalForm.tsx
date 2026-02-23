import {useState} from 'react'
import type {Location} from '../../types/Location'
import scheduleModal from '../../styles/scheduleModal.module.css'
import TimePicker from '../customs/TimePicker'

const GameDateInput = () => {
  return (
    <div className={scheduleModal.gameTimeContainer}>
      <div className="text">Game date: </div>
      <input className={scheduleModal.textfields} type="date" value={'2026-02-23'}></input>
    </div>
  )
}
const GameTimeInput = ({gameTime}: {gameTime: 'Starts' | 'Ends'}) => {
  return (
    <div className={scheduleModal.gameTimeContainer}>
      <div className="text">{`${gameTime} at: `}</div>
      <TimePicker />
    </div>
  )
}

const GameCapacityInput = () => {
  return (
    <div className={scheduleModal.gameCapacityContainer}>
      <div className="text">Game Event Capacity: </div>
      <input className={scheduleModal.textfield} type="number" min="0" max="30"></input>
    </div>
  )
}

const GameEventLocationDropdown = ({locations}: {locations: string[]}) => {
  const defaultLocation = locations[0]
  const [open, setOpen] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<string>(defaultLocation)
  return (
    <div className="scheduleDropdown">
      <div className="text">Game Event Location: </div>
      <div className={scheduleModal.scheduleDropdownSelect} onClick={() => setOpen((v) => !v)}>
        <div className={scheduleModal.scheduleDropdownSelectedItem}> {currentLocation} </div>
        <span className={`${scheduleModal.scheduleDropdownCaret} ${open && scheduleModal.caretRotate}`}></span>
      </div>
      <ul className={`${scheduleModal.scheduleDropdownItems} ${open && scheduleModal.open}`}>
        {locations.map((location) => (
          <li
            key={location}
            className={scheduleModal.scheduleDropdownItem}
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
    <div className={scheduleModal.formsButtons}>
      <button className="button modal-button" id="white" onClick={handler}>
        Cancel
      </button>
      <button className="button modal-button">Submit</button>
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
    <div className={isActive ? `modal active` : `modal`}>
      <div className="modal-popup">
        <h2 className="modal-header">New Game Event</h2>
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
