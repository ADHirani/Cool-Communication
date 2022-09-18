import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import "./styles/resgister.css";
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
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoute";

export const toastOption = {
  position: "top-left",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Register = () => {
  const navigate = useNavigate();
  const [handelOnChange, sethandelOnChange] = useState("");

  //  For password show and hide button

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const handleClickOnPass = () => setShowPass(!showPass);
  const handleClickOnCPass = () => setShowCPass(!showCPass);

  // Hide show button code ends

  const formSubmited = async (e) => {
    e.preventDefault();
    const [firstname, lastname, email, gender, password, , confirmpassword, ,] =
      e.target;

    const formData = {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      gender: gender.value,
      password: password.value,
      confirmpassword: confirmpassword.value,
    };

    if (handleValidation(formData) === true) {
      delete formData.confirmpassword;
      const { data } = await axios
        .post(registerRoute, formData)
        .then((response) => response);

      if (data.status === true) {
        localStorage.setItem(
          "cool-communication",
          JSON.stringify(data.newUser)
        );

        navigate("/setavatar");
      } else if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
    }
    // else {
    //   toast.error("Something went wrong please try again", toastOption);
    // }
  };

  const handleValidation = (formData) => {
    const { firstName, lastName, email, gender, password, confirmpassword } =
      formData;

    if (firstName.length === 0 || firstName.length < 3) {
      toast.error("Firstname should be atleast 3 characters", toastOption);
      return false;
    }

    if (email.length === 0) {
      toast.error("Email must be required", toastOption);
      return false;
    }

    if (gender.length === 0) {
      toast.error("Choose your gender", toastOption);
      return false;
    }

    if (password.length === 0 || confirmpassword.length === 0) {
      toast.error("Password must be required", toastOption);
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be atleast 8 characters", toastOption);
      return false;
    }

    if (password !== confirmpassword) {
      toast.error("Password doesn't match. Insert same password.", toastOption);
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
        <Flex align="center" justify="center" marginTop="-2">
          <VStack
            width={["85vw", "70vw", "55vw", "40vw", "35vw", "25vw"]}
            bg="#00203fff"
            borderRadius="10"
            boxShadow="2px 3px 3px gray"
            p="5"
            mt="-5"
          >
            <VStack spacing="0" justifyContent="center">
              <Heading color="white">Create a new account</Heading>
              <Text color="white">
                fill bellow details and press register button
              </Text>
            </VStack>

            <form
              onSubmit={(e) => {
                formSubmited(e);
              }}
            >
              <FormControl color="white">
                <InputGroup flexDirection="row" gap="6" my="1">
                  <InputGroup flexDirection="column" my="1">
                    <FormLabel my="0" py="0" color="white" fontSize="14">
                      FirstName:
                      <Required>*</Required>
                    </FormLabel>
                    <Input
                      h="9"
                      px="2"
                      fontSize="14px"
                      variant="flushed"
                      borderColor="#00203fff"
                      borderBottomColor="violet"
                      placeholder="Enter Firstname"
                      onChange={(e) => sethandelOnChange(e.target.value)}
                      id="firstname"
                    />
                  </InputGroup>
                  <InputGroup flexDirection="column" my="1" mt="2.5">
                    <FormLabel my="0" py="0" color="white" fontSize="14">
                      LastName:
                    </FormLabel>
                    <Input
                      h="9"
                      px="2"
                      fontSize="14px"
                      variant="flushed"
                      borderColor="#00203fff"
                      borderBottomColor="violet"
                      placeholder="Enter Lastname"
                      onChange={(e) => sethandelOnChange(e.target.value)}
                      id="lastname"
                    />
                  </InputGroup>
                </InputGroup>
                <InputGroup flexDirection="row" gap="6" my="1">
                  <InputGroup flexDirection="column" my="0">
                    <FormLabel my="0" py="0" color="white" fontSize="14">
                      Email:
                      <Required>*</Required>
                    </FormLabel>
                    <Input
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
                  <InputGroup flexDirection="column" my="0">
                    <FormLabel my="0" py="0" fontSize="14">
                      Gender:
                      <Required>*</Required>
                    </FormLabel>

                    <Select
                      h="9"
                      px="2"
                      fontSize="14px"
                      borderColor="#00203fff"
                      borderBottomColor="violet"
                      variant="flushed"
                      placeholder="Select Gender"
                      color="gray.500"
                      onChange={(e) => sethandelOnChange(e.target.value)}
                      id="gender"
                    >
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </Select>
                  </InputGroup>
                </InputGroup>
                <InputGroup flexDirection="column" mt="2">
                  <FormLabel my="0" py="0" color="white" fontSize="14">
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
                <InputGroup flexDirection="column" my="1">
                  <FormLabel my="0" py="0" color="white" fontSize="14">
                    Confirm Password:
                    <Required>*</Required>
                  </FormLabel>

                  <InputGroup size="md">
                    <Input
                      variant="flushed"
                      h="9"
                      px="2"
                      fontSize="14px"
                      borderColor="#00203fff"
                      borderBottomColor="violet"
                      pr="4.5rem"
                      type={showCPass ? "text" : "password"}
                      placeholder="Enter password again"
                      onChange={(e) => sethandelOnChange(e.target.value)}
                      id="confirmPassword"
                    />
                    <InputRightElement width="5rem">
                      <Button
                        variant="ghost"
                        h="1.50rem"
                        size="sm"
                        onClick={handleClickOnCPass}
                        color="gray.500"
                      >
                        {showCPass ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </InputGroup>
                <InputGroup mt="8" width="100%">
                  <Button colorScheme="purple" width="100%" type="submit">
                    Register
                  </Button>
                </InputGroup>

                <Box
                  display="flex"
                  flexDir="row"
                  justifyContent="center"
                  gap="2"
                  pt="2"
                >
                  <Text color="white" fontSize="md">
                    already have an account ?{" "}
                  </Text>
                  <Link
                    to="/login"
                    style={{
                      color: "#5f5fe9",
                      fontSize: "1rem",
                      marginTop: "-0.8px",
                    }}
                  >
                    Login
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

const GoBackBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <VStack align="flex-end" mx="10" marginTop="30" marginBottom="5">
        <Button
          onClick={() => {
            navigate("/");
          }}
          leftIcon={<BsArrowReturnLeft />}
          colorScheme="purple"
          variant="solid"
        >
          Go Back
        </Button>
      </VStack>
    </>
  );
};

const Required = styled.span`
  color: red;
  margin-left: 3px;
  font-size: large;
`;

export { Register, GoBackBtn };
