import Axios from "axios";
import { loader, login, failure } from "./actions/userActions";
import {
  GET,
  LOADING,
  INSERT,
  DELETE,
  SUCCESS,
  GETALLBOOKS,
  GETALLCATEGORIES,
  GETAUTHORS,
} from "./actions/BookActions";
//API RELATED METHODS
export const signup = (postData) => {
  return async (dispatch) => {
    //LOADER

    dispatch(loader());
    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/signup`,
      postData
    );

    dispatch(SUCCESS(response.data));
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

    dispatch(SUCCESS(response.data));

    console.log("verification response", response);
  };
};

export const signin = (postData) => {
  return async (dispatch) => {
    try {
      //dispatch(LOADING());

      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/signin`,
        postData
      );

      dispatch(login(response.data));
      //dispatch(SUCCESS());

      return true;
    } catch (error) {
      if (error.response) {
        dispatch(failure(error.response.data.error));
      }
    }
  };
};

export const fetchAuthorBooks = (data) => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/books/author/${data._id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      //SUCCESS
      dispatch(GET(response.data.books));
    } catch (error) {
      //ERROR
    }
  };
};

export const fetchBooks = () => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/books`
      );
      //SUCCESS
      dispatch(GETALLBOOKS(response.data.books));
    } catch (error) {
      //ERROR
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/book/categories`
      );
      //SUCCESS
      dispatch(GETALLCATEGORIES(response.data.categories));
    } catch (error) {
      //ERROR
    }
  };
};

export const fetchAuthors = () => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/book/authors`
      );
      //SUCCESS
      dispatch(GETAUTHORS(response.data.authors));
    } catch (error) {
      //ERROR
    }
  };
};

export const insertData = (data, token, _id) => {
  return async (dispatch) => {
    try {
      //LOADING
      //SUCCESS
      //dispatch(LOADING());
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/book/${_id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(INSERT());
      return true;
    } catch (error) {
      //FAilure
    }
  };
};

export const deleteData = (deleteId, _id, token) => {
  //alert("delete : " + deleteId + "id: " + _id);

  return async (dispatch) => {
    try {
      //LOADING
      const response = await Axios.delete(
        `${process.env.REACT_APP_BACKEND_URI}/books/${deleteId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAuthorBooks({ _id, token }));
      return true;
      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const updateData = (data, updateId, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/books/${updateId}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchAuthorBooks({ _id, token }));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};
