import MovieCard from "./MovieCard";

export default function MovieList({ movies, lastElementRef }) {
  return (
    <div className="px-12 mt-4 space-y-8">
      <div>
        <p className="text-black text-2xl font-semibold mb-4">Popular Shows</p>
        <div className="flex flex-wrap gap-2 justify-between">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              lastElementRef={
                movies.length === index + 1 ? lastElementRef : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
