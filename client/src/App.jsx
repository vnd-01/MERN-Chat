import {UserContextProvider } from "./UserContext";
import axios from "axios";
import Pages from "./Pages";

function App() {
  axios.defaults.baseURL = "https://mern-chat-api-vnd.vercel.app";
  axios.defaults.withCredentials = true;
  
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
