import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import { useParams } from "react-router-dom";


export default function WatchPage() {

  const navigate = useNavigate();
  const params = useParams()
  const { data, loading, error } = useMovie(params.id)

  
  if(loading) return <p>Loading...</p>

  if(error || !data) return <p>{error}</p>

  const { title, videoUrl } = data

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-80">
        <ArrowLeftIcon
          className="w-10 text-white cursor-pointer hover:opacity-80 transition"          
          onClick={() => navigate("/browse")}
        />
        <p className="text-white text-3xl font-bold">
          <span className="font-light">Watching:</span> {title}
        </p>
      </nav>
      <iframe
        className="h-full w-full"
        src={videoUrl}
        allow="autoplay"
      ></iframe>
    </div>
  );
}
