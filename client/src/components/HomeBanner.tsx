

export default function HomeBanner() {
  return (
    <div className="h-screen w-screen relative">
      <img
        className="w-full h-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/aad37504-bbe0-407d-b8a8-fb31b8faf374/web_tall_panel/US-en-20241028-TRIFECTA-perspective_da566312-cf4f-4cd5-b109-aef0fff3901f_large.jpg"        
        alt=""
      />
      <div className="absolute h-full w-full bg-black bg-opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-white font-bold text-5xl">
                Unlimited movies, TV shows, and more
            </h1>
            <p className="text-white text-3xl mt-3">
                Watch anywhere, Cancel anytime
            </p>
            <div className="mt-8">
                <a href="/login" className="bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semibold">Sign up</a>
            </div>
        </div>
      </div>
    </div>
  );
}
