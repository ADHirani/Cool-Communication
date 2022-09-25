import { Box, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import "./styles/resgister.css";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <Container>
        <div className="mainDiv">
          <div className="div1">W</div>
          <div className="div2">E</div>
          <div className="div3">L</div>
          <div className="div4">C</div>
          <div className="div5">O</div>
          <div className="div6">M</div>
          <div className="div7">E</div>
        </div>
        <Box color="whiteAlpha.500" mt="10">
          <Box display="flex" gap="3" justifyContent="center" mb="5">
            <Text fontSize="2xl">Hello</Text>
            <Text fontSize="3xl" color="white" mt="-1.5">
              {currentUser.firstName}
            </Text>
          </Box>
          <Text>Click at any chat to communicate with particular person.</Text>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mainDiv {
    width: 70%;
    max-height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: space-around;
    overflow: hidden;

    div {
      font-size: 5rem;
      font-family: "Just Another Hand", cursive;
      font-weight: bold;
    }
    .div1 {
      margin-bottom: 150px;
      animation: welcomeAnimation 0.5s 0.5s ease-in-out forwards;
    }
    .div2 {
      margin-bottom: 250px;
      animation: welcomeAnimation 0.5s 1s ease-in-out forwards;
    }
    .div3 {
      margin-bottom: 350px;
      animation: welcomeAnimation 0.5s 1.5s ease-in-out forwards;
    }
    .div4 {
      margin-bottom: 450px;
      animation: welcomeAnimation 0.5s 2s ease-in-out forwards;
    }
    .div5 {
      margin-bottom: 550px;
      animation: welcomeAnimation 0.5s 2.5s ease-in-out forwards;
    }
    .div6 {
      margin-bottom: 650px;
      animation: welcomeAnimation 0.5s 3s ease-in-out forwards;
    }
    .div7 {
      margin-bottom: 750px;
      animation: welcomeAnimation 0.5s 3.5s ease-in-out forwards;
    }
    @keyframes welcomeAnimation {
      80% {
        margin-bottom: -15px;
      }
      100% {
        margin-bottom: 0px;
      }
    }
  }
`;

export default Welcome;
