import type { GameEvent } from "@/types/GameEvent";

export const isGameAvailable = (gameEvent: GameEvent) => {
  if (gameEvent) {
    const players = gameEvent.registeredPlayers?.length;
    return players < gameEvent.capacity;
  } else {
    return false;
  }
};
