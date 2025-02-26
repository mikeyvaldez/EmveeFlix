import { useEffect, useReducer } from "react";
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
}


const reducer = (_, action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        data: null,
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

const usePlans = () => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchPlansList();
  }, []);

  const fetchPlansList = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get('/api/sub/products');
      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  return { data, loading, error };
};

export default usePlans;
