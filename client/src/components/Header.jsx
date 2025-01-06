import { Link } from "react-router-dom"; // goes to page without refreshing page
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, isLoading } = useSelector((state) => state.user);
  const [showBackground, setShowBackground] = useState(false);
  const { logout } = useAuth();

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
        <Link to="/" className="self-center text-sm sm:text-xl font-bold">
          <span className="px-2 py-1 text-red-700 font-bold text-4xl">
            EmveeFlix
          </span>
        </Link>
        <div className="flex gap-7 ml-8 md:order-2">
          <ul className="flex gap-4">
            <li>
              <a href="/" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {user && !isLoading && (
          <div>
            <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
