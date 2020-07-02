const initState = {
  authUser: window.localStorage.getItem("authUser")
    ? JSON.parse(window.localStorage.getItem("authUser"))
    : {},
  user: {},
  loading: false,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("authUser", JSON.stringify(action.payload));
      return {
        ...state,
        authUser: action.payload,
        loading: false,
      };

    case "AUTHUSER":
      if (action.payload.mostLikedBooks) {
        return {
          ...state,
          user: {
            mostLikedBooks: action.payload,
            ...state.user.mostReadBooks,
          },
          loading: false,
        };
      } else if (action.payload.mostReadBooks) {
        return {
          ...state,
          user: {
            mostReadBooks: action.payload.mostReadBooks,
            ...state.user.mostLikedBooks,
          },
          loading: false,
        };
      } else {
        return {
          ...state,
          user: action.payload,
        };
      }
    /*  return {
        ...state,
        ...state.user,
        user: action.payload,
        loading: false,
      };
 */
    case "LOGOUT":
      window.localStorage.setItem("authUser", JSON.stringify({}));
      window.localStorage.removeItem("authUser");
      return {
        ...state,
        authUser: {},
        user: {},
        loading: false,
      };

    case "GET":
      const authUser = JSON.parse(window.localStorage.getItem("authUser"));
      return {
        authUser,
      };

    case "LOADING":
      return { ...state, loading: true };

    case "SUCCESS":
      return {
        ...state,
        authUser: action.payload,
        loading: false,
      };
    case "FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
