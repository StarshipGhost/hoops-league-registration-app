import React, { useEffect, useState, type ChangeEvent } from "react";
import type { Location } from "../../types/Location";
import { Button } from "../ui/button";
import Select from "../ui/custom/Select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/custom/DatePicker";
import TimeRangePicker from "../customs/TimeRangePicker";
import { useHeaderContext } from "../customs/HeaderContext";
import type { Player } from "@/types/Player";
import CloseButton from "../customs/CloseButton";
import Modal from "./Modal";
import type { GameEvent } from "@/types/GameEvent";

const ErrorMessage = ({ isInvalid }: { isInvalid: boolean }) => {
  return isInvalid && <div className="text-red-500 text-center mt-2">One or multiple fields are invalid!</div>;
};

const GameDateInput = ({ date, setDate }: { date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Game date:</Label>
      <DatePicker date={date} setDate={setDate} />
    </div>
  );
};

const GameDurationInput = ({
  start,
  handleStartTimeUpdate,
  end,
  handleEndTimeUpdate,
}: {
  start: string;
  handleStartTimeUpdate: (data: string) => void;
  end: string;
  handleEndTimeUpdate: (data: string) => void;
}) => {
  const {
    theme: { darkMode },
  } = useHeaderContext();

  return (
    <div className="flex flex-col gap-2">
      <Label>Duration:</Label>
      <TimeRangePicker start={start} handleStartTimeUpdate={handleStartTimeUpdate} end={end} handleEndTimeUpdate={handleEndTimeUpdate} darkMode={darkMode} />
    </div>
  );
};

const GameCapacityInput = ({ value, handleValueChange }: { value: number; handleValueChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor="capacity">
        Capacity:
      </label>
      <input
        className="h-9 w-15 sm:w-full text-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 border border-box border-solid border-neutral-300 dark:border-input rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400"
        name="capacity"
        id="capacity"
        type="number"
        value={value.toString()}
        onChange={handleValueChange}
        min="1"
        max="30"
      ></input>
    </div>
  );
};

const LocationDropdown = ({ location, setLocation }: { location: Location | undefined; setLocation: React.Dispatch<React.SetStateAction<Location | undefined>> }) => {
  const locations: Location[] = [
    {
      name: "Collège Bois de Boulogne - Complexe sportif - 1er étage",
      link: "https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    },
    {
      name: "Collège Bois de Boulogne - Complexe sportif - 2e étage",
      link: "https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    },
    {
      name: "Victor-Doré - Gymnase",
      link: "https://www.google.com/maps/place/1985+Rue+Victor+Dor%C3%A9,+Montr%C3%A9al,+QC+H3M+1S4/@45.5370461,-73.6908979,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc918816dcb2e81:0x9c09f7567d8965ec!8m2!3d45.5370461!4d-73.688323!16s%2Fg%2F11m62qjrw_?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D",
    },
  ];
  return (
    <div className="min-w-0 w-full flex flex-col justify-between gap-2">
      <Select label={"Location"} options={locations} option={location} setCurrentOption={setLocation} />
    </div>
  );
};

const ScheduleFormCard = ({
  editingEvent, 
  closeModal,
  addGameEvent,
  updateGameEvent,
}: {
  editingEvent: GameEvent | null,
  closeModal: () => void;
  addGameEvent: (date: Date, start: string, end: string, location: Location, capacity: number) => void;
  updateGameEvent: (date: Date, start: string, end: string, location: Location, capacity: number) => void
}) => {
  const [date, setDate] = useState<Date | undefined>();
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [location, setLocation] = useState<Location | undefined>();
  const [capacity, setCapacity] = useState<number>(NaN);
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>(editingEvent ? editingEvent.registeredPlayers: [])
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);

  const clearFields = () => {
    setDate(undefined);
    setStart("");
    setEnd("");
    setLocation(undefined);
    setCapacity(NaN);
    setIsFormInvalid(false);
  };

  useEffect(() => {
    if (editingEvent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDate(editingEvent.date)
      setStart(editingEvent.start);
      setEnd(editingEvent.end);
      setLocation(editingEvent.location);
      setCapacity(editingEvent.capacity);
      setCurrentPlayers(editingEvent.registeredPlayers);
      setIsFormInvalid(false)
    }
    else {
      clearFields();
    }
  }, [editingEvent])
  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value) || "";
    if (e.target.value.length < 3) {
      setCapacity(number as number);
    }
  };

  const closeCard = (): void => {
    closeModal();
    clearFields();
  };

  const submitGameEvent = (date: Date | undefined, start: string, end: string, location: Location | undefined, players: Player[], capacity: number) => {
    const isEmpty = (value: string): boolean => value.length === 0;
    if (!date || isEmpty(start) || isEmpty(end) || !location || isNaN(capacity) || capacity > 30 || capacity < players.length) {
      setIsFormInvalid(true);
      setTimeout(() => {
        setIsFormInvalid(false);
      }, 5000);
      return;
    }
    if (editingEvent === null) {
      addGameEvent(date, start, end, location, capacity);
    } else {
      updateGameEvent(date, start, end, location, capacity);
    }
    clearFields();
  };

  return (
    <Card className="w-120 min-w-80 border-box">
      <CardHeader className="relative">
        <CloseButton closeFunction={closeCard} />
        <CardTitle className="text-xl">{editingEvent ? "Update game event" : "New game event"}</CardTitle>
        <CardDescription>{editingEvent ? "Edit the selected basket-ball session" : "Add a new basket-ball session this week"}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <GameDateInput date={date} setDate={setDate} />
        <GameDurationInput start={start} handleStartTimeUpdate={(data: string) => setStart(data)} end={end} handleEndTimeUpdate={(data: string) => setEnd(data)} />
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
          <LocationDropdown location={location} setLocation={setLocation} />
          <GameCapacityInput value={capacity} handleValueChange={handleCapacityChange} />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" variant="orange" onClick={() => submitGameEvent(date, start, end, location, currentPlayers, capacity)}>
          Submit
        </Button>
        <Button variant="white" onClick={() => closeCard()}>
          Cancel
        </Button>
        <ErrorMessage isInvalid={isFormInvalid} />
      </CardFooter>
    </Card>
  );
};

const ScheduleModalForm = ({
  isActive,
  editingEvent,
  closeModal,
  addGameEvent,
  updateGameEvent
}: {
  isActive: boolean;
  editingEvent: GameEvent | null,
  closeModal: () => void;
  addGameEvent: (date: Date, start: string, end: string, location: Location, capacity: number) => void;
  updateGameEvent: (date: Date, start: string, end: string, location: Location, capacity: number) => void;
}) => {
  return (
    <Modal isModalActive={isActive}>
      <ScheduleFormCard editingEvent={editingEvent} closeModal={closeModal} addGameEvent={addGameEvent} updateGameEvent={updateGameEvent} />
    </Modal>
  );
};

export default ScheduleModalForm;
