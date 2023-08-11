import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const RegisterAndLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const { setUserName: setLoggedInUserName, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    const url = isLoginOrRegister === "register" ? "register" : "login";
    ev.preventDefault();
    const { data } = await axios.post(url, { username, password });
    setLoggedInUserName(username);
    setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          onChange={(ev) => setUserName(ev.target.value)}
          value={username}
          className="block w-full rounded-sm p-2 mb-2 border"
          type="text"
          placeholder="username"
        />
        <input
          onChange={(ev) => setPassword(ev.target.value)}
          value={password}
          className="block w-full rounded-sm p-2 mb-2 border"
          type="password"
          placeholder="password"
        />
        <button className="p-2 bg-violet-500 text-white block w-full rounded-sm">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a Member?
              <button onClick={() => setIsLoginOrRegister("login")}>
                Login Here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Don't have an account?
              <button onClick={() => setIsLoginOrRegister("register")}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLogin;
