import axios from "axios";

const url = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(url).then((response) => response.data);
};

const create = (newObj) => {
  return axios
    .post(url, newObj)
    .then((response) => response.data)
    .catch((error) => {
        if(error.response)
        error.response.data
    });
};
const deleteNote = (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const update = (id, newObj) => {
  return axios.put(`${url}/${id}`, newObj).then((response) => response.data);
};

export default { getAll, create, deleteNote, update };
