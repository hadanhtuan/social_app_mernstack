import {
  FETCH_ALL,
  CREATE_POST,
  EDIT_POST,
  LIKE_POST,
  DEL_POST,
  START_LOADING,
  END_LOADING,
  FETCH_ALL_BY_SEARCH,
  FETCH_POST,
  FETCH_POST_BY_CREATOR
} from "../constraint/actionTypes";

const initState = {
  listPost: [],
  post: null,
  isLoading: false,
  currentPage: 0,
  numberOfPages: 3,
};

export default (state = initState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, isLoading: true };
    }
    case END_LOADING: {
      return { ...state, isLoading: false };
    }
    case FETCH_POST_BY_CREATOR: {
      return { ...state, listPost: action.payload };
    }
    case FETCH_ALL:
      return {
        ...state,
        listPost: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload
      };
    case FETCH_ALL_BY_SEARCH:
      return {
        ...state,
        listPost: action.payload
      };
    case CREATE_POST:
      // return state
      return { ...state, listPost: [...state.listPost, action.payload] };
    case EDIT_POST:
      return {
        ...state,
        listPost: state.listPost.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        listPost: state.listPost.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DEL_POST:
      return {
        ...state,
        listPost: state.listPost.filter((post) => post._id != action.payload),
      };

    default:
      return state;
  }
};
