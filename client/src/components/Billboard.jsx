import BillboardButton from "./BillboardButton";

export default function Billboard() {
  return (
    <div className="relative h-screen">      
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/paBZJJXUEtg?autoplay=1&mute=1"                
        allow="autoplay"                
      ></iframe>
      <div className="absolute top-[40%] ml-16">
        <p className="text-white mt-8 mb-5 drop-shadow-xl text-7xl">
          Sons of Anarchy
        </p>
        <div className="flex items-center mt-4 gap-3">
          <button>
            <BillboardButton text="Play" theme="light" />
          </button>
          <button>
            <BillboardButton text="More Info" theme="dark" />
          </button>
        </div>
      </div>
    </div>
  );
}
