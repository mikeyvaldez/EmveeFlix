import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList"
import NavBar from "../components/NavBar";


export default function BrowsePage() {
  return (
    <div>
        <NavBar />
        <Billboard />
        <div className="pb-5">
            <MovieList />
        </div>
    </div>
  )
}
