const initState = {
  loading: false,
};

export const GlobalReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESSS":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
