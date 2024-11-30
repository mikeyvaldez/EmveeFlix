import Header from "../components/Header";

export default function LoginPage() {
  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <Header />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">Sign up</h2>

          <form className="flex flex-col gap-4">
            <input
              id="username"
              type="text"
              placeholder="Username"
              name="name"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
            />
            <input
              id="email"
              type="email"
              placeholder="Email address"
              name="email"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
            />
            <input
              type="submit"
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800"
            />
          </form>
          <p className="text-neutral-500 mt-5">
            <span className="text-white ml-1 hover:underline cursor-pointer">
              First time using Netflix?
            </span>
          </p>
          <p className="text-neutral-500 mt-5">
            <span className="text-white ml-1 hover:underline cursor-pointer">
              Already have an account?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
