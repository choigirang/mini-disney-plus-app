import "./App.css";
import styled from "styled-components";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Catergory from "./components/Catergory";
import Row from "./components/Row";
import requests from "./api/requests";

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px; // Nav 보다 아래에 위치
  padding: 0 calc(3.5vw + 5px);

  &::after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;

function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Catergory></Catergory>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      ></Row>
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      ></Row>
    </Container>
  );
}

export default App;
