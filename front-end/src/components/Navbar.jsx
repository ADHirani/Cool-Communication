import React from "react";
import styled from "styled-components";
const Navbar = (props) => {
  return (
    <>
      <Container>
        <div>
          <div className="cool">cool</div>
          <div className="communication">communication</div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 15vh;
  background-color: #00203fff;
  color: #adefd1ff;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  .cool {
    margin: 0%;
    padding: 0%;
    font-family: "Great Vibes", cursive;
    font-size: 85px;
    margin-top: 2rem;
    letter-spacing: 2rem;
    cursor: pointer;
  }
  .communication {
    position: relative;
    top: -4rem;
    margin: 0%;
    padding: 0%;
    font: 100 50px/1.2 "Merienda One", Helvetica, sans-serif;
    text-shadow: 3px 1px 3px #adefd1ff;
    font-family: "Merienda One", cursive;
    cursor: pointer;
    color: white;
  }
  @media screen and (max-width: 480px) {
    height: 10vh;
    padding: 3rem;
    .cool {
      font-size: 60px;
      margin-top: 1rem;
    }
    .communication {
      font: 100 40px/1.2 "Merienda One", Helvetica, sans-serif;
      top: -2.5rem;
    }
  }
`;
export default Navbar;
