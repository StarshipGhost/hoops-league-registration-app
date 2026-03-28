import type { GameEvent } from "@/types/GameEvent";

export const isGameAvailable = (gameEvent: GameEvent | undefined) => {
  if (gameEvent) {
    const players: number = gameEvent.registeredPlayers.length;
    return players < gameEvent.capacity;
  } else {
    return false;
  }
};
