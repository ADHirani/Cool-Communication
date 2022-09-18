import { Box, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getMessages } from "../utils/APIRoute";

const MessageContainer = ({ selectedChat, currentUser }) => {
  const [messages, setmessages] = useState("");

  useEffect(() => {
    getAllMessages();
  }, []);
  const getAllMessages = async () => {
    const { data } = await axios.post(getMessages, {
      sender: currentUser,
      reciver: selectedChat,
    });
    if (data) {
      setmessages(data);
    } else {
      setmessages("");
    }
  };
  // console.log(messages);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <MessageContainerHeader selectedChat={selectedChat} />
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        height={["57rem"]}
        overflow="hidden"
      >
        <MsgContainer>
          {messages &&
            messages.map((msg, i) => {
              return (
                <MsgDiv
                  key={i}
                  className={
                    msg.sender._id === currentUser._id
                      ? "senderCls"
                      : "reciverCls"
                  }
                >
                  <p>{msg.message}</p>
                </MsgDiv>
              );
            })}
        </MsgContainer>
      </Box>
    </>
  );
};
const MsgContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  background-color: transparent;
  overflow-y: scroll;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20%;
    background-color: #461da5;
  }
  .senderCls {
    display: flex;
    justify-content: flex-end;
  }
  .reciverCls {
    display: flex;
    justify-content: flex-start;
  }
`;
const MsgDiv = styled.div`
  width: 100%;
  padding: 8px 20px;
  p {
    background-color: #1c0097cc;
    color: white;
    padding: 3px 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;

const MessageContainerHeader = ({ selectedChat }) => {
  return (
    <>
      <Box
        width="100%"
        bg="#131324"
        color="white"
        p="2"
        pt="4"
        display="flex"
        flexDir="row"
        cursor="pointer"
        alignItems="center"
        pl="5"
        gap="1.7rem"
      >
        <Img src={selectedChat.avatarImg} w="3.7rem" borderRadius="full" />
        <Box>
          <Text fontSize="1.8rem" textTransform="capitalize">
            {selectedChat.firstName}
          </Text>
        </Box>
        <Box ml="-5" mt="2">
          <Text color="gray.300" fontSize="1.2rem" textTransform="capitalize">
            {selectedChat.lastName}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default MessageContainer;
