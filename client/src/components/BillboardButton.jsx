import { PlayIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";


export default function BillboardButton({ text, theme }) {
  return (
    <button
      className={`${
        theme === "dark" ? "bg-opacity-60" : null
      } bg-white rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-center hover:bg-neutral-600 transition`}
    >
      <PlayIcon
        className={`w-7 ${theme === "light" ? null : "text-white"} mr-1`}
      />
      <p className={`${theme === "light" ? "text-black" : "text-white"}`}>
        {text}
      </p>
    </button>
  );
}

BillboardButton.propTypes = {
    text: PropTypes.string,
    theme: PropTypes.string,
}
