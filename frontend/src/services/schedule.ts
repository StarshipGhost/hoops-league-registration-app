import type { GameEvent } from "@/types/GameEvent";
import type { Player } from "@/types/Player";
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://hoops-league-registration-app.onrender.com";

const getSchedule = async () => {
  const response = await axios.get(`${BASE_URL}/schedule`);
  return response.data;
};

const getGameEvent = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/schedule${id}`);
  return response.data;
};

const createGameEvent = async (schedule: GameEvent) => {
  const response = await axios.post(`${BASE_URL}/schedule`, schedule);
  return response.data;
};

const updateGameEvent = async (schedule: GameEvent, id: number) => {
  const response = await axios.patch(`${BASE_URL}/schedule/${id}`, schedule);
  return response.data;
};

const deleteGameEvent = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/schedule/${id}`);
  return response.data;
};

const gameEventRegistration = async (id: number, player: Player) => {
  const response = await axios.post(`${BASE_URL}/schedule/${id}/register`, player, {withCredentials: true});
  return response.data;
};

const gameEventCancellation = async (id: number, playerId: string | undefined) => {
  const response = await axios.delete(`${BASE_URL}/schedule/${id}/register/${playerId}`, {withCredentials: true});
  return response.data;
};

export default {
  getSchedule,
  getGameEvent,
  createGameEvent,
  updateGameEvent,
  deleteGameEvent,
  gameEventRegistration,
  gameEventCancellation,
};
