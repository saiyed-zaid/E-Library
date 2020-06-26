const initState = {
  authUser: JSON.parse(window.localStorage.getItem("authUser")),
};
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("authUser", JSON.stringify(action.payload));
      return {
        ...state,
        authuser: action.payload,
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
