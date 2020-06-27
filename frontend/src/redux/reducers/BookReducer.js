const initState = {
  books: [],
  searchBooks: [],
  categories: [],
  authors: [],
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

    case "GETALLBOOKS":
      return {
        ...state,
        searchBooks: action.payload,
      };

    case "GETALLCATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GETAUTHORS":
      return {
        ...state,
        authors: action.payload,
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
