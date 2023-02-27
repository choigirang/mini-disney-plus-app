import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // instance를 default로 설정했기 떄문에 어떠한 이름으로 불러와도 상관없다.
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

export const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false); // 비디오가 있으면 비디오 재생을 보여줄 상태값

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const reponse = await axios.get(requests.fetchNowPlaying);
    console.log(reponse);

    // await가 없이 response를 찍을 경우 pending이 나온다.
    // 우리가 원하는 데이터가 아닌데 이유는 비동기로 처리되기 떄문에 console.log가 먼저 찍혀서
    // 데이터가 아직 넘어오지 않았다.
    const movieId =
      reponse.data.results[
        Math.floor(Math.random() * reponse.data.results.length)
      ].id;
    // 받아온 데이터 중 result 안에는 영화 정보들, 그 중 random을 돌려, 거기에 영화 갯수 곱하고 버리기
    // 나온 숫자에 id값을 가져온다.
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    // 특정 영화의 더 상세한 정보를 가져오기 (비디오 포함)
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }; // 텍스트 잘라줄 함수

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
            >
              {/* inline frame의 약자로, 다른 HTML페이지를 현재 페이지에 포함시키는 중첩된 브라우저로
              iframe요소를 이용하면 다른 페이지를 불러와서 삽입할 수 있다.
            */}
            </Iframe>
          </HomeContainer>
        </Container>
        <button
          onClick={() => {
            setIsClicked(false);
          }}
        >
          X
        </button>
      </>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          // style이다.
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div style={{ fontSize: 10 }} className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
            {/* 무비의 타이틀이 있으면 타이틀, 네임이 있으면 네임, 오리진 네임이 있으면 */}
          </h1>
          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key && ( //movie가 있으면, 그 movie의 video가 있으면, result[0]가 있으면, key가 있으면
              //그리고 버튼도 함께
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                play
              </button>
            )}
          </div>
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
