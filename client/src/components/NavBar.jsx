import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";


const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function NavBar() {
  const { user, isLoading } = useSelector((state) => state.user.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, deleteUser } = useAuth();
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
 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          <div className="relative">
            {/* Hamburger Icon */}
            <button
              className="p-2 text-3xl text-white rounded-md lg"
              onClick={toggleMenu}
            >
              <GiHamburgerMenu className="text-3xl hover:text-4xl"/>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                <div className="px-4 py-2">{user.username}</div>{" "}                
                <div
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={deleteUser}
                >
                  Delete Account
                </div>
              </div>
            )}
          </div>
        )}
        
      </div>
    </nav>
  );
}
