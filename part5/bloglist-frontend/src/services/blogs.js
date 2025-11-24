import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const postBlog = async (newBlog) => {
  console.log("token: ", token);

  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
};
const updateBlog = async (id, updateData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
};
const deleteBlog = async (id) => {
   const user = {
    headers: { Authorization: token },
  };
  try {
     await axios.delete(`${baseUrl}/${id}`,user);
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
};

export default { getAll, setToken, postBlog, updateBlog, deleteBlog };
