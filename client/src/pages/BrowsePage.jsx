import NavBar from "../components/NavBar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMoviesList from "../hooks/useMoviesList";
import { useState, useRef, useCallback } from "react";
import LoadingCards from "../components/LoadingCards";
import { useSelector } from "react-redux";

export default function BrowsePage() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useMoviesList(offset);

  const observer = useRef(null);

  const { user, isLoading } = useSelector(
    (state) => state.user.value
  );

//   console.log({ isLoading, user });
  // console.log(data)

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + 12);
          console.log("intersecting");
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div>
      <NavBar />
      <Billboard />
      <div className="pb-5">
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
        {loading ? <LoadingCards /> : null}
      </div>
    </div>
  );
}
