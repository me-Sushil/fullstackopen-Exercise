import axios from "axios";

const url = "/api/persons";

const getAll=()=>{
   return axios.get(url).then(responce=>responce.data);
}

const create=(newObj)=>{
   return axios.post(url, newObj).then(responce=>responce.data)
}
const deleteNote=(id)=>{
    return axios.delete(`${url}/${id}`).then(response=> response.data);
}

const update=(id, newObj)=>{
    return axios.put(`${url}/${id}`, newObj).then(responce=>responce.data);
}

export default {getAll, create, deleteNote, update};