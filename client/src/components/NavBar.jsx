import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function NavBar() {
  const { user, isLoading } = useSelector(
    (state) => state.user.value
  );
  const { logout } = useAuth();
  const [showBackground, setShowBackground] = useState(false);
  const navigate = useNavigate();

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
        <span
          className="px-2 py-1 text-red-700 font-bold text-4xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          EmveeFlix
        </span>
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              <p>{tab}</p>
            </div>
          ))}
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
