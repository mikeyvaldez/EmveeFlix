import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../features/userSlice";

const cookie = new Cookie();

const useAuth = () => {
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    const { token, user } = response.data;
    cookie.set("session_token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );
    return response.data;
  };

  const signup = async ({ email, password, username }) => {
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
      username,
    });
    const { token, user } = response.data;
    cookie.set("session_token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );
    return response.data;
  };

  const fetchUser = async () => {
    const sessionToken = cookie.get("session_token");

    try {
      const response = await axios.get("/api/auth/me", {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });
      const user = response.data;

      if (!user) {
        return dispatch(clearUser());
      }

      dispatch(
        setUser({
          email: user.email,
          username: user.username,
        })
      );
    } catch (error) {
      return dispatch(clearUser());
    }
  };

  const logout = () => {
    cookie.remove("session_token");
    return dispatch(clearUser());
  };

  const deleteUser = async () => {
    try {
      const sessionToken = cookie.get("session_token");

      // Make sure token exists
      if (!sessionToken) {
        console.error("No token provided");
        return;
      }

      const user = await fetchUser();
      const userId = user;

      // Send DELETE request to the API endpoint
      const response = await axios.delete(`/api/auth/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

     
      cookie.remove("session_token");
      return dispatch(clearUser())
    } catch (error) {
      // Handle error
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { signup, login, logout, fetchUser, deleteUser };
};

export default useAuth;
