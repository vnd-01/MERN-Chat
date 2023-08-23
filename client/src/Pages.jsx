import React, { useContext } from "react";
import RegisterAndLogin from "./components/RegisterAndLogin";
import { UserContext } from "./UserContext";
import Chat from "./components/Chat";

const Pages = () => {
  const { username } = useContext(UserContext);
  if (username) {
    return <Chat />;
  } else {
    return <RegisterAndLogin />;
  }
};

export default Pages;
