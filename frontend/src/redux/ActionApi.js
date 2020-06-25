import Axios from "axios";
import { loader, login, failure, success } from "./actions/userActions";
//API RELATED METHODS
export const signup = (postData) => {
  return async (dispatch) => {
    //LOADER

    dispatch(loader());
    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/signup`,
      postData
    );

    dispatch(success(response.data));
    //Dispatch success

    console.log("asd", response);
    //API REQUEST
  };
};

export const verifyAccount = (postData) => {
  return async (dispatch) => {
    dispatch(loader());

    let response = await Axios.patch(
      `${process.env.REACT_APP_BACKEND_URI}/user/verification/${postData._id}`,
      postData
    );

    dispatch(success(response.data));

    console.log("verification response", response);
  };
};

export const signin = (postData) => {
  return async (dispatch) => {
    try {
      dispatch(loader());

      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/signin`,
        postData
      );

      dispatch(login(response.data));

      return true;
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data.error));
      }
    }
  };
};
