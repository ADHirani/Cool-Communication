import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import { GoBackBtn } from "./Register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "./Register";
import axios from "axios";
import { loginRoute } from "../utils/APIRoute";

const Login = () => {
  const [handelOnChange, sethandelOnChange] = useState("");

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const handleClickOnPass = () => setShowPass(!showPass);

  const formSubmited = async (e) => {
    e.preventDefault();
    const [email, password] = e.target;
    const formData = {
      email: email.value,
      password: password.value,
    };

    if (handleValidation(formData) === true) {
      const { data } = await axios
        .post(loginRoute, formData)
        .then((response) => response);

      if (data.status === true) {
        localStorage.setItem(
          "cool-communication",
          JSON.stringify(data.userData)
        );

        navigate("/chat");
      } else {
        toast.error(data.msg, toastOption);
      }
    } else {
      toast.error("Something went wrong please try again later", toastOption);
    }
  };

  const handleValidation = (formData) => {
    const { email, password } = formData;
    if (email.length === 0) {
      toast.error("Email must be required", toastOption);
      return false;
    }
    if (password.length === 0 || password.length < 8) {
      toast.error(
        "password must be required atleast 8 characters",
        toastOption
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Container maxWidth="100vw" px="0">
        <Navbar />
        <GoBackBtn />
        <ToastContainer />
        <Flex align="center" justify="center" marginTop="10" mx="10">
          <VStack
            width={["95vw", "68vw", "50vw", "35vw", "30vw", "25vw"]}
            bg="#00203fff"
            borderRadius="10"
            boxShadow="2px 3px 3px gray"
            p="10"
            mt="-5"
          >
            <VStack spacing="0" justifyContent="center" mb="5">
              <Heading color="white">Login an account</Heading>
              <Text color="white">
                fill bellow details and press login button
              </Text>
            </VStack>

            <form
              onSubmit={(e) => {
                formSubmited(e);
              }}
            >
              <FormControl color="white">
                <InputGroup flexDirection="column" my="0">
                  <FormLabel my="0" py="0" color="white">
                    Email:
                    <Required>*</Required>
                  </FormLabel>
                  <Input
                    width="20rem"
                    h="9"
                    px="2"
                    fontSize="14px"
                    variant="flushed"
                    borderColor="#00203fff"
                    borderBottomColor="violet"
                    onChange={(e) => sethandelOnChange(e.target.value)}
                    placeholder="Enter email"
                    id="email"
                  />
                </InputGroup>

                <InputGroup flexDirection="column" mt="2">
                  <FormLabel my="0" py="0" color="white">
                    Password:
                    <Required>*</Required>
                  </FormLabel>

                  <InputGroup size="md">
                    <Input
                      h="9"
                      px="2"
                      fontSize="14px"
                      variant="flushed"
                      borderColor="#00203fff"
                      borderBottomColor="violet"
                      pr="4.5rem"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      onChange={(e) => sethandelOnChange(e.target.value)}
                      id="password"
                    />
                    <InputRightElement width="5rem">
                      <Button
                        variant="ghost"
                        h="1.50rem"
                        size="sm"
                        color="gray.500"
                        onClick={handleClickOnPass}
                      >
                        {showPass ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </InputGroup>

                <InputGroup mt="8" width="100%">
                  <Button colorScheme="purple" width="100%" type="submit">
                    Log In
                  </Button>
                </InputGroup>

                <Box
                  display="flex"
                  justifyContent="center"
                  flexDir="row"
                  gap="2"
                  pt="2"
                >
                  <Text color="white" fontSize="md">
                    Don't have an account ?{" "}
                  </Text>
                  <Link
                    to="/register"
                    style={{
                      color: "#5f5fe9",
                      fontSize: "1rem",
                      marginTop: "-0.8px",
                    }}
                  >
                    Register
                  </Link>
                </Box>
              </FormControl>
            </form>
          </VStack>
        </Flex>
      </Container>
    </>
  );
};

const Required = styled.span`
  color: red;
  margin-left: 3px;
  font-size: large;
`;

export default Login;
