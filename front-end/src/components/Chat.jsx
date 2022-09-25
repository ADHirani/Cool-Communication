import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { allChatRoute, getMessagesRoute, host } from "../utils/APIRoute";
import Contact from "./Contact";
import { useEffect } from "react";
import Welcome from "./Welcome";
import MessageContainer from "./MessageContainer";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const Chat = () => {
  const navigate = useNavigate();
  const socket = io(host);
  const [isselectedChat, setisSelectedChat] = useState(false);
  const [selectedChat, setselectedChat] = useState(); // Selected user from left side
  const [allChat, setallChat] = useState([]); // All users left side
  const [chatIndex, setchatIndex] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("cool-communication"));

  // call all user contacts starts

  useEffect(() => {
    getAllChat();
  }, []);

  const getAllChat = async () => {
    if (!currentUser || currentUser === undefined) {
      navigate("/login");
    } else {
      const { data } = await axios.post(allChatRoute, {
        userId: currentUser._id,
      });
      setallChat(data);
    }
  };

  // call user contacts ends
  // call all messages starts

  // call all mesages ends

  const chatClicked = (i, chat) => {
    setisSelectedChat(true);
    setchatIndex(i);
    setselectedChat(chat);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      bg="#adefd1ff"
      color="#6b46c1"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={["90vw"]}
        height="80vh"
        bg="#6b46c1"
        borderRadius="1rem"
        boxShadow="2px 1px 2px 0.5px gray"
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignItems="center"
        p="0px"
        gap="0.3rem"
      >
        <Box
          height="97%"
          width="29.3%"
          bg="#131324"
          overflow="hidden"
          borderRadius="10px"
        >
          <Contact
            allChat={allChat}
            currentUser={currentUser}
            chatIndex={chatIndex}
            isselectedChat={isselectedChat}
            chatClicked={chatClicked}
          />
        </Box>
        <Box
          height="97%"
          width="69.3%"
          bg="#131324"
          overflow="hidden"
          borderRadius="10px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
        >
          {selectedChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <MessageContainer
              selectedChat={selectedChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
          {/* <Box>
            {selectedChat === undefined ? (
              ""
            ) : (
              <InputChatContainer
                selectedChat={selectedChat}
                currentUser={userData}
              />
            )}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
