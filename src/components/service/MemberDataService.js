import axios from "axios";

const URL = "http://127.0.0.1:7080/membersData";

export const listMemberData = () =>  axios.get(URL);

export const savedMemberData = (memberData) => axios.post(URL, memberData);

export const editMemberData = (memberDataid) => {
    return axios.get(URL + '/' + memberDataid);
}

export const updateDataMemberData = (memberDataid , memberData) =>{
    return axios.put(URL + '/' + memberDataid,memberData);
}
export const deleteMemberData = (memberDataId)=> axios.delete(URL + '/' + memberDataId);


