import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
// import { Link, useLocation, useNavigate } from "react-router-dom"; // goes to page without refreshing page
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMoon, FaSun } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { toggleTheme } from "../redux/theme/themeSlice";
// import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Header() {
//   const { user, isLoading } = useSelector((state) => state.user.value)
  const [showBackground, setShowBackground] = useState(false);
//   const { logout } = useAuth();
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? "bg-black bg-opacity-90" : null
        }`}
      >
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="logo"
        />
        <div className="flex gap-7 ml-8 mr-auto">
          <ul className="flex gap-4">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        {/* {user && !isLoading && (
          <div>
            <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
}
