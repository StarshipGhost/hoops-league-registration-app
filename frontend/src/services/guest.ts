import axios from "axios";

const GUEST_URL = "http://localhost:3000/guest";

const getGuestId = async (): Promise<string> => {
  const response = await axios.get(`${GUEST_URL}`, {
    withCredentials: true,
  });
  return response.data.guestId;
};

export default {
  getGuestId,
};