import type { GameEvent } from "@/types/GameEvent";
import axios from "axios";

const BASE_URL = "http://localhost:3000/schedule";

const getSchedule = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const getGameEvent = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const createGameEvent = async (schedule: GameEvent) => {
  const response = await axios.post(`${BASE_URL}`, schedule);
  return response.data;
};

const updateGameEvent = async (schedule: GameEvent, id: number) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, schedule);
  return response.data;
};

const deleteGameEvent = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export default { getSchedule, getGameEvent, createGameEvent, updateGameEvent, deleteGameEvent };
