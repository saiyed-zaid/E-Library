const initState = {
  authUser: window.localStorage.getItem("authUser")
    ? JSON.parse(window.localStorage.getItem("authUser"))
    : {},
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

    case "LOGOUT":
      window.localStorage.setItem("authUser", JSON.stringify({}));
      window.localStorage.removeItem("authUser");
      return {
        ...state,
        authUser: {},
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
