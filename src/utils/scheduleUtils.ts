import type { GameEvent } from "@/types/GameEvent";

export const isGameAvailable = (gameEvent: GameEvent) => {
  return gameEvent.registeredPlayers.length < gameEvent.capacity;
}