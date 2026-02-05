import type {Location} from './Location'
import type {Player} from './Player'

export type GameEvent = {date: Date; start: Date; end: Date; location: Location; registeredPlayers: Player[]; capacity: number}
