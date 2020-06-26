const initState = {
  books: [],
  loading: false,
};

export const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case "GETBOOKS":
      return {
        ...state,
        books: action.payload,
        loading: false,
      };

    case "INSERT":
      return {
        ...state,
      };

    case "UPDATE":
      return {
        ...state,
      };

    case "DELETE":
      return {
        ...state,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SUCCESS":
      return {
        ...state,
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
