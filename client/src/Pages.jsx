import React, { useContext } from "react";
import RegisterAndLogin from "./components/RegisterAndLogin";
import { UserContext } from "./UserContext";
import Chat from "./components/Chat";

const Pages = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return <Chat />;
  }
  return <RegisterAndLogin />;
};

export default Pages;
