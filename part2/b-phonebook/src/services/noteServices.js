import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  return axios.get(url).then((response) => response.data);
};

const create = (newObj) => {
  return axios
    .post(url, newObj)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error({ error: "Network error" });
      }
    });
};
const deleteNote = (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const update = (id, newObj) => {
  return axios.put(`${url}/${id}`, newObj).then((response) => response.data);
};

export default { getAll, create, deleteNote, update };
