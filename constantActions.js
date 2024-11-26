import * as actionTypes from "./actionTypes";
import axios from "axios";

export function changeConstant(constant) {
  return { type: actionTypes.CHANGE_ACCOUNT, payload: constant };
}

export function getConstantsSuccess(constants) {
  return { type: actionTypes.GET_ACCOUNTS_SUCCESS, payload: constants };
}



export function getConstants() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = "userInfo.access_token";

  return function (dispatch) {
    const apiUrl = "http://127.0.0.1:7080/app/dashboard";
    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + accessToken,
        },
      })
      .then((response) =>
        dispatch(getConstantsSuccess(response.data.constants))
      )
      .catch((error) => {
        console.error(error);
      });
  };

}





