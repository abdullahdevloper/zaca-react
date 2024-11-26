import axios from "axios";

const URL = "http://127.0.0.1:7080/memberJob";

export const listMemberJobs = () =>  axios.get(URL);

export const savedMemberJob = (memberJob) => axios.post(URL, memberJob);

export const editMemberJob = (memberJobid) => {
    return axios.get(URL + '/' + memberJobid);
}

export const updateDataMemberJob = (memberJobid , memberJob) =>{
    return axios.put(URL + '/' + memberJobid,memberJob);
}
export const deleteMemberJobs = (memberJobId)=> axios.delete(URL + '/' + memberJobId);


