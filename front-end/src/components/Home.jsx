import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
const Home = () => {
  // axios.get("http://localhost:5000").then((result) => console.log(result));

  return (
    <Container>
      <Navbar />
      <LoginSigninBtn />
    </Container>
  );
};
const LoginSigninBtn = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="button">
        <Button className="signinbtn" onClick={() => navigate("/register")}>
          Sign In
        </Button>
        <Button className="loginbtn" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </div>
    </>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #adefd1ff;
  .button {
    padding: 20px;
    width: 40%;
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    justify-content: flex-end;
    justify-content: space-around;
    background-color: transparent;
    animation: loadAnimation 700ms ease-in-out forwards;

    Button {
      width: 40%;
      border-radius: 5px;
      font-size: 15px;
    }
    .signinbtn {
      background-color: #6b46c1;
      color: white;
      &:hover {
        background-color: transparent;
        border: 1px solid #6b46c1;
        color: #6b46c1;
      }
    }
  }
  .loginbtn {
    background-color: transparent;
    border: 1px solid #6b46c1;
    color: #6b46c1;
    &:hover {
      background-color: #6b46c1;
      color: white;
    }
  }
  @keyframes loadAnimation {
    0% {
      margin-right: -30rem;
    }
    80% {
      margin-right: 3rem;
    }
    100% {
      margin-right: 0rem;
    }
  }
  @media screen and (max-width: 786px) {
    .button {
      width: 100%;
      align-self: center;
    }
  }
  @media screen and (min-width: 787px) {
    .button {
      width: 70%;
      align-self: center;
    }
  }
  @media screen and (min-width: 1080px) {
    .button {
      width: 40%;
      align-self: flex-end;
    }
  }
`;

export { Home, LoginSigninBtn };
