import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { allChatRoute, getMessages } from "../utils/APIRoute";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Welcome from "./Welcome";
import MessageContainer from "./MessageContainer";
import InputChatContainer from "./InputChatContainer";

const Chat = () => {
  const navigate = useNavigate();

  const [selectedChat, setselectedChat] = useState(undefined);
  const [allChat, setallChat] = useState([]);

  // call user contacts starts

  const userData = JSON.parse(localStorage.getItem("cool-communication"));

  useEffect(() => {
    const getAllChat = async () => {
      const { data } = await axios.post(allChatRoute, {
        userId: userData._id,
      });
      setallChat(data);
    };

    getAllChat();
  }, []);

  // call user contacts starts

  const [chatIndex, setchatIndex] = useState(0);
  const [isselectedChat, setisSelectedChat] = useState(false);

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
            currentUser={userData}
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
            <Welcome />
          ) : (
            <MessageContainer
              selectedChat={selectedChat}
              currentUser={userData}
            />
          )}
          <Box>
            {selectedChat === undefined ? (
              ""
            ) : (
              <InputChatContainer
                selectedChat={selectedChat}
                currentUser={userData}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
