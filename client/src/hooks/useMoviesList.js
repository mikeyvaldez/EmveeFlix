import { useEffect, useReducer, useState } from "react";
import axios from "axios";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const ActionType = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMoviesList = (offset) => {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  const fetchMoviesList = async () => {
    if (data && count && data.length >= count) return;
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/list?offset=${offset}`
      );
      
       // Check if the data exists in the response
       if (response && response.data && response.data.movies) {
        const moviesData = data
          ? [...data, ...response.data.movies]
          : response.data.movies;
        setCount(response.data.count);
        dispatch({ type: ActionType.SUCCESS, payload: moviesData });
      } else {
        dispatch({ type: ActionType.FAILED, payload: "No movies found" });
      }
    } catch (error) {
      // Log detailed error information
      console.error("Error fetching movies:", error);
      dispatch({ type: ActionType.FAILED, payload: error?.response?.data?.message || "Something went wrong" });
    }
  };

  return { data, loading, error };
};

export default useMoviesList;
