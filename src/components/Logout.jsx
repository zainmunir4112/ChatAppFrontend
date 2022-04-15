import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";

export default function Logout() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try{
      const token = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).token;
  
       const { data } = await axios.post(`${logoutRoute}`, {}, {
         headers: {
           "x-access-token": token,
         },
       });

       if(!data.success) throw data;
        localStorage.clear();
        navigate("/login");
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message) {
        return toast.error(error.response.data.message, toastOptions);
      }else {
        return toast.error(error.message, toastOptions);
      }
    }
  };

  return (
    <>
      <ToastContainer/>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
