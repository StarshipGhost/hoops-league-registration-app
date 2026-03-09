import type {Location} from './Location'
import type {Player} from './Player'

export type GameEvent = {id: number, date: Date; start: string; end: string; location: Location; registeredPlayers: Player[], capacity: number, isAvailable: boolean}
