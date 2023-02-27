// axios를 인스턴스로 생성해서 쓰는 이유
// axios를 사용하는 경우에 매번 주소값을 치고 있는 건 비효율적이기 때문에
// 요청의 겹치는 기본 주소를 인스턴스로 생성하여 사용한다.

// Get Movie BY Latest
// https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

// Get Movie Detail
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// Get Movie Reviews
// https://api.themoviedb.org/3/movie/{movie_id}/review?api_key=<<api_key>>&language=en-US&page=1

// Get Trending
// https://api.themoviedb.org/3/trending/movie/latest?api_key=<<api_key>>&language=en-US

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "b18e798ff377ef49f1c335283e7c43d6",
    language: "ko-KR",
  },
});

export default instance;
