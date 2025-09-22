import axios from "axios";
const loginUrl = "/api/login";

const login = async (userData) => {
  const response = await axios.post(loginUrl, userData);
  return response.data;
};

export default { login };
