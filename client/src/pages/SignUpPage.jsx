import { Alert, Button, Spinner, TextInput } from "flowbite-react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";

export default function LoginPage() {
  // const { loading, error: errorMessage } = useSelector((state) => state.user);
  // const [formData, setFormData] = useState({});
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   // .trim() is so that there are no spaces within the input
  //   setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.email || !formData.password) {
  //     return dispatch(signInFailure("Please fill all the fields"));
  //   }
  //   try {
  //     dispatch(signInStart());
  //     const res = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signInFailure(data.message));
  //     }
  //     if (res.ok) {
  //       dispatch(signInSuccess(data));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //   }
  // };

  return (
    <div className="h-screen w-screen">      
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Sign Up</h2>
          <form className="flex flex-col gap-4" >
            <TextInput type="text" placeholder="Username" id="username" />
            <TextInput type="email" placeholder="Email Address" id="email" />
            <TextInput type="password" placeholder="Password" id="password" />
            <Button
              gradientDuoTone="pinkToOrange"
              type="submit"              
              className="font-bold"
            >
              Submit
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="text-white">Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Login
            </Link>
          </div>
          {/* {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
}
