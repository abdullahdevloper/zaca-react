import axios from "axios";

const URL = "http://127.0.0.1:7080/users";

export const listUsers = () =>  axios.get(URL);

export const savedUser = (user) => axios.post(URL, user);

export const editUser = (userid) => {
    return axios.get(URL + '/' + userid);
}

export const updateDataUser = (userid , user) =>{
    return axios.put(URL + '/' + userid,user);
}
export const deleteUser = (userId)=> axios.delete(URL + '/' + userId);


