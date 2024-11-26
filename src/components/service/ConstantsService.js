import axios from "axios";

const URL = "http://127.0.0.1:7080/constants";

export const listConstants = () =>  axios.get(URL);

export const savedConstant = (constant) => axios.post(URL, constant);

export const editConstant = (constantid) => {
    return axios.get(URL + '/' + constantid);
}

export const updateDataConstant = (constantid , constant) =>{
    return axios.put(URL + '/' + constantid,constant);
}
export const deleteConstant = (constantId)=> axios.delete(URL + '/' + constantId);


