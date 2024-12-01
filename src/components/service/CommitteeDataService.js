import axios from "axios";

const URL = "http://127.0.0.1:7080/committeeData";

export const listCommitteeData = () =>  axios.get(URL);

export const savedCommitteeData = (committeeData) => axios.post(URL, committeeData);

export const editCommitteeData = (committeeDataid) => {
    return axios.get(`${URL}/${committeeDataid}`); 

}

export const updateCommitteeData = (committeeDataid , committeeData) =>{
    return axios.put(URL + '/' + committeeDataid,committeeData);
}
export const deleteCommitteeData = (committeeDataId)=> axios.delete(URL + '/' + committeeDataId);


