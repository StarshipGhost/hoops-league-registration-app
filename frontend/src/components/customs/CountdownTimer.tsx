import getTimer from "@/services/timer";
import type { GameEvent } from "@/types/GameEvent";
import { useEffect, useRef, useState } from "react";

interface timeProps {
  secs: number;
  mins: number;
  hrs: number;
  days: number;
}

const CountdownTimer = ({
  gameEvent,
  openGameEventRegistrations,
  closeGameEventRegistrations,
}: {
  gameEvent: GameEvent;
  openGameEventRegistrations: (gameEvent: GameEvent) => void;
  closeGameEventRegistrations: (gameEvent: GameEvent) => void;
}) => {
  const [currentTime, setCurrentTime] = useState<timeProps>({ secs: 59, mins: 59, hrs: 23, days: 7 });
  const intervalRef = useRef<number | undefined>(undefined);
  const countdownDate = useRef<number>(-1);

  const startCountdown = () => {
    const diff = countdownDate.current - Date.now();
    if (diff <= 0) {
      setCurrentTime({ secs: 0, mins: 0, hrs: 0, days: 0 });
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
        closeGameEventRegistrations(gameEvent);
      }
      return;
    } else if (!gameEvent.openRegistrations) {
      setCurrentTime({ secs: 0, mins: 0, hrs: 0, days: 0 });
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      return;
    }

    const secs = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const hrs = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setCurrentTime({ secs: secs, mins: mins, hrs: hrs, days: days });
  };

  useEffect(() => {
    const fetchTimer = async () => {
      try {
        if (gameEvent) {
          openGameEventRegistrations(gameEvent);
          countdownDate.current = await getTimer();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTimer();
    intervalRef.current = setInterval(startCountdown, 1000);

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEvent.date, gameEvent.start, gameEvent.capacity]);

  return (
    <div className="text-neutral-900 dark:text-neutral-100 bg-neutral-200/50 dark:bg-neutral-900/10 border-neutral-900 dark:border-neutral-100 space-y-4 p-4 border-2 border-solid rounded-lg shadow-lg">
      <p className="text-xs sm:text-sm font-semibold">
        You have the following time window to change your registration status for the upcoming event:{" "}
      </p>
      <div className="grid grid-rows-[1fr_0.5fr] grid-cols-6 gap-y-2 justify-self-center text-neutral-900 dark:text-neutral-100 bg-neutral-200/80 dark:bg-neutral-900/80 border-neutral-700 px-4 py-2 border-2 rounded-sm border-solid">
        <span className="row-start-1 col-start-1 place-content-center text-center text-2xl sm:text-5xl font-semibold">
          {currentTime.days.toString().padStart(2, "0")}
        </span>
        <span className="row-start-2 col-start-1 text-center text-[10px] sm:text-sm">{"days"}</span>
        <span className="row-start-1 col-start-2 text-lg sm:text-3xl place-content-center text-center font-bold">:</span>
        <span className="row-start-1 col-start-3 place-content-center text-center text-2xl sm:text-5xl font-semibold">
          {currentTime.hrs.toString().padStart(2, "0")}
        </span>
        <span className="row-start-2 col-start-3 text-center text-[10px] sm:text-sm">{"hours"}</span>
        <span className="row-start-1 col-start-4 text-lg sm:text-3xl place-content-center text-center font-bold">:</span>
        <span className="row-start-1 col-start-5 place-content-center text-center text-2xl sm:text-5xl font-semibold">
          {currentTime.mins.toString().padStart(2, "0")}
        </span>
        <span className="row-start-2 col-start-5 text-center text-[10px] sm:text-sm">{"minutes"}</span>
        <span className="row-start-1 col-start-6 text-lg sm:text-3xl place-content-center text-center font-bold">:</span>
        <span className="row-start-1 col-start-7 place-content-center text-center text-2xl sm:text-5xl font-semibold">
          {currentTime.secs.toString().padStart(2, "0")}
        </span>
        <span className="row-start-2 col-start-7 text-center text-[10px] sm:text-sm">{"seconds"}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
