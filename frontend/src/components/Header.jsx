import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function Header() {
  return (
    <nav className="w-full fixed z-40">
      <div className="px-16 py-6 flex items-center bg-black bg-opacity-90">        
        <span
          className="px-2 py-1 bg-green-400 rounded-lg text-white"
          aria-relevant="logo"
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
      </div>
    </nav>
  );
}
