import { message } from "antd";

import Axios from "axios";
import { loader, login, failure, authUser } from "./actions/userActions";
import {
  GET,
  LOADING,
  INSERT,
  DELETE,
  SUCCESS,
  GETALLBOOKS,
  GETALLCATEGORIES,
  GETAUTHORS,
  GETBOOK,
  SETBOOKTOREAD,
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
      return true;
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error);
      }
    }
  };
};

export const fetchAuthUser = (_id, token) => {
  return async (dispatch) => {
    try {
      //LOADING
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
      //SUCCESS
    } catch (error) {
      //FAILURE
    }
  };
};

export const fetchAuthorBooks = (data) => {
  return async (dispatch) => {
    try {
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
      //dispatch(LOADING());
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
    } catch (error) {
      //ERROR
    }
  };
};

export const FetchMostReadBooks = (_id, token) => {
  return async (dispatch) => {
    //LOADING
    try {
      //dispatch(LOADING());
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
    } catch (error) {
      //ERROR
    }
  };
};
