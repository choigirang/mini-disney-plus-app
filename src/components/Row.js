import React, { useCallback, useState, useEffect } from "react";
import axios from "../api/axios";
import "./Row.css";
import { MovieModal } from "./MovieModal/index";

export default function Row({ title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovieData = useCallback(async () => {
    const reponse = await axios.get(fetchUrl);
    console.log("reponse", reponse);
    setMovies(reponse.data.results);
  }, [fetchUrl]);
  // useEffect를 사용하면 렌더링 되면서 함수도 다시 렌더링된다.
  // 함수는 린데렁 될 필요가 없기 떄문에 useCallback을 사용하여 함수를 기억해준다.
  // fetchURL이 바뀌면 함수를 다시 생성하도록 한다.
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
  };
  console.log(document.getElementById(id)); // 한 줄씩 잡아준다.
  console.log(document.getElementById(id)?.scrollLeft);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            ></img>
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {/* {setModalOpen && <MovieModal></MovieModal>} */}
    </div>
  );
}
