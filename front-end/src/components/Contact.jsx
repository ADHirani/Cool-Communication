import { Box, Button, Img, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
const Contact = (props) => {
  const navigate = useNavigate();

  const [userOption, setuserOption] = useState();
  const { allChat, currentUser, chatIndex, isselectedChat, chatClicked } =
    props;

  if (userOption === "change-avatar") {
    navigate("/setavatar");
  }

  return (
    <>
      <Box
        width="100%"
        bg="#6b46c1"
        height="6rem"
        color="white"
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        p="2"
      >
        <Box display="flex">
          <Img
            width="2.5rem"
            height="2.5rem"
            borderRadius="full"
            src={currentUser.avatarImg}
            mr="-1.5"
            cursor="pointer"
          />
          <Button
            variant="unstyled"
            ml="-1"
            mt="3px"
            fontSize="3xl"
            color="white"
            rightIcon={<IoMdArrowDropdown />}
          />

          <SelectCustom
            placeholder=" "
            onChange={(e) => setuserOption(e.target.value)}
          >
            <OptionCustom
              value="xyz"
              style={{ display: "none" }}
            ></OptionCustom>
            <OptionCustom value="change-avatar">Change Avatar</OptionCustom>
            {/* <OptionCustom value="change-name">Change Name</OptionCustom> */}
          </SelectCustom>
        </Box>
        <Box display="flex" flexDir="column" justifyContent="end">
          <Button
            variant="solid"
            colorScheme="whiteAlpha"
            minHeight="33px"
            minWidth="8px"
            p="0px"
            color="white"
            ml="70%"
            mt="15px"
            fontSize="2xl"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("cool-communication");
            }}
          >
            <BiPowerOff />
          </Button>
          <Text fontSize="2xl" fontWeight="bold" textAlign="end">
            {currentUser.firstName}
          </Text>
          <Text
            fontSize="1xl"
            color="gray.300"
            textAlign="end"
            mt="-2"
            mb="-1.5"
          >
            {currentUser.email}
          </Text>
        </Box>
      </Box>
      <BoxCustom>
        {allChat.map((chat, i) => (
          <Box
            key={i}
            width="100%"
            bg={isselectedChat && chatIndex === i ? "#461da5" : "#6b46c1"}
            border={
              isselectedChat && chatIndex === i ? "3px solid #131324" : ""
            }
            minHeight="4.5rem"
            borderRadius="8px"
            display="flex"
            flexDir="row"
            alignItems="center"
            cursor="pointer"
            gap="1rem"
            onClick={() => chatClicked(i, chat)}
          >
            <Img
              src={chat.avatarImg}
              width="3.5rem"
              borderRadius="full"
              ml="4"
              height="3.5rem"
              alt={chat.firstName}
              overflow="hidden"
            />
            <Box p="0" display="flex" flexDir="column">
              <Text
                color="white"
                overflow="auto"
                fontSize="1.5rem"
                p="0"
                m="0"
                mb="-6px"
                overflowX="hidden"
              >
                {chat.firstName}
              </Text>
              <Text
                color="gray.300"
                overflow="hidden"
                fontSize="1xl"
                p="0"
                m="0"
                overflowX="hidden"
                mt="-6px"
              >
                {chat.email}
              </Text>
            </Box>
          </Box>
        ))}
      </BoxCustom>
    </>
  );
};

const SelectCustom = styled.select`
  position: relative;
  top: 13px;
  left: -25px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-color: transparent;
  color: transparent;
  overflow: auto;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const OptionCustom = styled.option`
  color: white;
  cursor: pointer;
  background-color: #6b46c1;
  border-radius: 5px;
  &:focus {
    font-weight: bold;
    background-color: #131324;
  }
`;

const BoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 5px;
  margin-top: 3px;
  max-height: 85%;
  padding-bottom: 50px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #461da5;
  }
`;
export default Contact;
