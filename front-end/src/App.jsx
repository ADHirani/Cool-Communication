import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./components/Avatar";
import Chat from "./components/Chat";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setavatar" element={<Avatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AppContainer>
  );
}
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #adefd1ff;
`;

export default App;
