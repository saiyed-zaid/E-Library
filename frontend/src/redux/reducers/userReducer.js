const initState = {
  data: {},
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
    case "LOADING":
      return { ...state, loading: true };

    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
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
