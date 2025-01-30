import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { AuthFormContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function SignupPage() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [authError, setAuthError] = useState("");  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({ password, email, name }) => {    
    try {
      await signup({ email, password, username: name });
      setAuthError(""); // Clear any previous errors      
      navigate("/plans"); // Set to true after successful signup
    } catch (error) {
      setAuthError(error.response.data.errors[0].msg);
    }    
  };

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Sign up</h2>
          <AuthFormContext.Provider value={{ register, errors }}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Input id="username" type="text" label="Username" name="name" />
              <Input id="email" type="email" label="Email address" name="email" />
              <Input
                id="password"
                type="password"
                label="Password"
                name="password"
                validate={() => {
                  const password = getValues("password");
                  if (password.length < 8) return "Password must be greater than 8 characters";
                  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase value";
                  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase value";
                  if (!/\d/.test(password)) return "Password must have a number";
                  return true;
                }}
              />
              <input
                type="submit"
                className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"                
              />
              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          <p className="mt-4 text-blue-300 hover:underline cursor-pointer" onClick={() => navigate("/login")}>Already have an account?</p>
        </div>
      </div>
    </div>
  );
}