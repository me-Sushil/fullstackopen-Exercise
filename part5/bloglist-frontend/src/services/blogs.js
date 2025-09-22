import axios from 'axios'
const baseUrl = '/api/blogs';
const loginUrl = "/api/login";

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const login = async (userData)=>{
  const response = await axios.post(loginUrl,userData);
  return response.data;
}

export default { getAll, login };