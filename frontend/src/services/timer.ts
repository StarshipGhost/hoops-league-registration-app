import axios from 'axios';

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://hoops-league-registration-app.onrender.com";

const getTimer = async () => {
    const response = await axios.get(`${BASE_URL}/timer`)
    return response.data;
}

export default getTimer