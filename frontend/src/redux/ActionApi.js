import React from "react";
import { message, notification } from "antd";

import { SmileOutlined } from "@ant-design/icons";

import Axios from "axios";

import { login, authUser } from "./actions/userActions";

import {
  GET,
  INSERT,
  GETALLBOOKS,
  GETALLCATEGORIES,
  GETAUTHORS,
  GETBOOK,
  SETBOOKTOREAD,
} from "./actions/BookActions";

import { LOADING, SUCCESSS } from "./actions/GlobalActions";
//API RELATED METHODS
export const signup = (postData) => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/signup`,
        postData
      );

      dispatch(SUCCESSS());
    } catch (error) {}
  };
};

export const verifyAccount = (postData) => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/user/verification`,
        postData
      );

      dispatch(SUCCESSS());
    } catch (error) {}
  };
};

export const signin = (postData) => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/signin`,
        postData
      );

      dispatch(login(response.data));
      dispatch(SUCCESSS());
      return true;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error);
        dispatch(SUCCESSS());
      }
    }
  };
};

export const socialLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/social-login`,
        data
      );

      dispatch(login(response.data));
      dispatch(SUCCESSS());
      return true;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error);
        dispatch(SUCCESSS());
      }
    }
  };
};

export const forgetPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/forget-password`,
        data,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      notification["success"]({
        message: "Reset Password",
        description: response.data.message,
        duration: 0,
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    } catch (error) {
      message.warning(error.response.data.error);
    }
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/reset-password`,
        data,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      notification["success"]({
        message: "Reset Password",
        description: response.data.message,
        duration: 0,
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    } catch (error) {
      message.warning(error.response.data.error);
    }
  };
};

export const fetchAuthUser = (_id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/user/${_id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(authUser(response.data));
      dispatch(SUCCESSS());
      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const fetchAuthorBooks = (data) => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());
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
      dispatch(SUCCESSS());
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

export const fetchBook = (_id) => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/books/${_id}`
      );
      //SUCCESS
      dispatch(GETBOOK(response.data.book));
    } catch (error) {
      //ERROR
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    //LOADING
    try {
      dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/book/categories`
      );
      //SUCCESS
      dispatch(GETALLCATEGORIES(response.data.categories));
      dispatch(SUCCESSS());
    } catch (error) {
      //ERROR
    }
  };
};

export const fetchAuthors = () => {
  return async (dispatch) => {
    //LOADING
    try {
      dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/book/authors`
      );
      //SUCCESS
      dispatch(GETAUTHORS(response.data.authors));
      dispatch(SUCCESSS());
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
      message.success("Book Added Successfully.")
      return true;
    } catch (error) {
      message.error(error.response.data.error);
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
      message.warning("Record Deleted Successfully");
      return true;
      //SUCCESS
    } catch (error) {
      //FAILURE
      message.error(error.response.data.error);
      return false;
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
      message.success("Data Updated Successfully");
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const addComment = (data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/book/comment`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchBook(data.bookId));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const toggleLike = (data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/book/like`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchBook(data.bookId));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const toggleDislike = (data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/book/dislike`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchBook(data.bookId));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const toggleFavourite = (hasfavourite, data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/book/favourite`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      hasfavourite
        ? message.warning("Book Removed From Favourite List")
        : message.success("Book Added to Favourite List");

      dispatch(fetchBook(data.bookId));
      dispatch(fetchAuthUser(_id, token));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const toggleReadlater = (hasReadLater, data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/book/read-later`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      hasReadLater
        ? message.warning("Book Removed From Read Later List")
        : message.success("Book Added To Read Later List");

      dispatch(fetchBook(data.bookId));
      dispatch(fetchAuthUser(_id, token));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const updatePlan = (data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const book = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/plan/${_id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchAuthUser(_id, token));
      return true;

      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const insertCurrentRead = (data, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      //SUCCESS
      //dispatch(LOADING());
      const response = await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URI}/user/book/read`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.canRead) {
        fetchAuthUser(_id, token);
        return true;
      } else {
        message.warning(response.data.error);
        return false;
      }
    } catch (error) {
      //FAilure
    }
  };
};

export const deleteCurrentRead = (deleteId, _id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
      const response = await Axios.delete(
        `${process.env.REACT_APP_BACKEND_URI}/user/book/read/${deleteId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isRemoved) {
        dispatch(fetchAuthUser(_id, token));

        message.success(response.data.successText);

        return true;
      } else {
        message.warning(response.data.error);
        return false;
      }
      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

//Writer APIS

export const FetchMostLikedBooks = (_id, token) => {
  return async (dispatch) => {
    //LOADING
    try {
      dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/report/most-liked-book`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //SUCCESS
      dispatch(authUser(response.data));
      dispatch(SUCCESSS());
    } catch (error) {
      //ERROR
    }
  };
};

export const FetchMostReadBooks = (_id, token) => {
  return async (dispatch) => {
    //LOADING
    try {
      dispatch(LOADING());
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/report/most-read-book`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //SUCCESS
      dispatch(authUser(response.data));
      dispatch(SUCCESSS());
    } catch (error) {
      //ERROR
    }
  };
};
