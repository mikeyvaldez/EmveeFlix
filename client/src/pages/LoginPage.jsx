import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function LoginPage() {
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // .trim() is so that there are no spaces within the input
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="relative bg-gray-700 h-screen w-screen bg-opacity-50">
      <Header />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Log in</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextInput type="email" placeholder="Email Address" id="email" onChange={handleChange}/>
            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
            <Button
              gradientDuoTone="pinkToOrange"
              type="submit"
              disabled={loading}
              className="font-bold"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="text-white">Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-400">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
