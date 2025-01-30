import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { AuthFormContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authError, setAuthError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({ password, email }) => {
    try {
      await login({ email, password });
      setAuthError("");
      navigate("/browse"); 
    } catch (error) {
      setAuthError(error.response.data.errors[0].msg);
    }
  };

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Log in</h2>
          <AuthFormContext.Provider value={{ register, errors }}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Input id="email" type="email" label="Email address" name="email" />
              <Input id="password" type="password" label="Password" name="password" />
              <input
                type="submit"
                className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          <p className="mt-4 text-blue-300 hover:underline cursor-pointer" onClick={() => navigate("/signup")}>Dont have an account yet?</p>
        </div>
      </div>
    </div>
  );
}