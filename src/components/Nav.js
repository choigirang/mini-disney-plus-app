import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    }); // 스크롤 이벤트 리스너를 등록한다.
    // 이벤트가 발생했을 때 scrollY값이 50이 넘어가면 show의 상태값은 true가 된다.
    return () => {
      window.removeEventListener("scroll", () => {});
    }; // 이벤트 리스너가 사용되지 않을 때, 이벤트가 계속 호출되면 안되기 떄문에 이벤트 핸들러를 제거한다.
  });

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "https://www.disneyplus.com")}
        ></img>
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "transparent" : "#040714")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 1000;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0px;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;
