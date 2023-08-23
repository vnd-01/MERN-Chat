import {UserContextProvider } from "./UserContext";
import axios from "axios";
import Pages from "./Pages";

function App() {
  axios.defaults.baseURL = "https://mern-chat-v5l9.onrender.com";
  axios.defaults.withCredentials = true;
  
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
