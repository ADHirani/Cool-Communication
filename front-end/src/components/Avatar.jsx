import { Button, Container, Img, VStack } from "@chakra-ui/react";
import React from "react";
import avatarGenrator from "../utils/avatarGenrator";
import { FiRefreshCcw } from "react-icons/fi";
import axios from "axios";
import { avatarRoute } from "../utils/APIRoute";
import { toast, ToastContainer } from "react-toastify";
import { toastOption } from "./Register";
import { useNavigate } from "react-router-dom";
const Avatar = () => {
  const navigate = useNavigate();
  // Avatar genrator functionality starts

  const userData = JSON.parse(localStorage.getItem("cool-communication"));

  const avatars = [];

  function changeAvatar() {
    for (let i = 0; i < 5; i++) {
      const avatarData = {
        gender: userData.gender,
        id: Math.round(Math.random() * 100 + 1),
      };
      avatars[i] = avatarGenrator(avatarData);
    }
  }

  changeAvatar();

  // Avatar genrator functionality ends

  const avatarClicked = async (i) => {
    // Calling api starts here

    const { data } = await axios.post(avatarRoute, {
      userId: userData._id,
      setAvatarImg: avatars[i],
    });
    if (data.status === true) {
      toast.info(`${data.msg} just a second`, toastOption);
      localStorage.setItem("cool-communication", JSON.stringify(data.userData));

      setTimeout(() => navigate("/chat"), 4000);
    } else {
      toast.error(data.msg, toastOption);
    }

    // Calling apis ends here
  };

  return (
    <Container bg="#adefd1ff" maxWidth="100vw" maxHeight="100vh">
      <ToastContainer />
      <VStack
        display="flex"
        gap={["0.7rem", "0.6rem", "1rem", "1rem", "2rem", "2rem"]}
        flexDirection="row"
        m="auto"
        pt="200"
        justify="center"
        className="avatar-group"
      >
        {avatars.map(function (avatar, index) {
          return (
            <Img
              src={avatar}
              key={index}
              alt="avatar"
              width={["2.5rem", "3.8rem", "5rem", "6rem", "7rem", "8rem"]}
              borderRadius="full"
              onClick={() => {
                avatarClicked(index);
              }}
              cursor="pointer"
            />
          );
        })}
        <Button
          borderRadius="full"
          padding="0px"
          onClick={() => changeAvatar()}
        >
          {<FiRefreshCcw />}
        </Button>
      </VStack>
    </Container>
  );
};

export default Avatar;
