import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoute";
import { toast, ToastContainer } from "react-toastify";
import { toastOption } from "./Register";

const InputChatContainer = ({ selectedChat, currentUser, socket }) => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [message, setMessage] = useState(""); // Messeges which is wrrited by user

  const emojiPickerHideShow = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };

  const emojiClicked = (e, emoji) => {
    let message = "";
    message += emoji.emoji;
    setMessage(message + message);
  };

  const handleSendMessage = async () => {
    if (message.length === 0) {
      toast.info("Enter message please.", toastOption);
    } else {
      // calling api here starts
      await axios.post(sendMessageRoute, {
        message: message,
        sender: currentUser,
        reciver: selectedChat,
      });

      socket.emit("send-msg", {
        message: message,
        sender: currentUser,
        reciver: selectedChat,
      });

      // calling api here ends
    }
    setMessage("");
  };

  const enterKeyPressed = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Box
        width="95%"
        height="100%"
        bg="#461da5"
        borderRadius="15px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
      >
        <Box
          color="yellow"
          fontSize="2xl"
          cursor="pointer"
          onClick={emojiPickerHideShow}
        >
          <BsFillEmojiSmileFill />
          <Box position="absolute" bottom="22%" className="emoji">
            {showEmojiPicker ? <EmojiPicker onEmojiClick={emojiClicked} /> : ""}
          </Box>
        </Box>
        <Input
          p="2"
          placeholder="Enter messages here"
          variant="flushed"
          className="chat-input"
          width="70%"
          height="80%"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={enterKeyPressed}
        ></Input>
        <Box
          color="white"
          fontSize="2xl"
          cursor="pointer"
          p="1.5"
          onClick={handleSendMessage}
        >
          <IoSend />
        </Box>
      </Box>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: transparent;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .chat-input {
    border-bottom: 2px solid #6b46c1;
    color: white;
    &:focus {
      border-color: #6b46c1;
    }
    &::selection {
      border: 5px solid;
      border-color: #6b46c1;
    }
  }
  .emoji-picker-react {
    background-color: #6b46c1;
    box-shadow: 0px 0px 15px gray;
    border: 0px;
    border-radius: 15px;

    .emoji-categories {
      color: white;
    }
    .emoji-search {
      background-color: #131324;
      height: 2rem;
      color: white;
      font-size: medium;
    }
  }
  .emoji-group::before {
    background-color: #6b46c1;
  }
  .emoji {
    background-color: transparent;
  }
`;

export default InputChatContainer;
