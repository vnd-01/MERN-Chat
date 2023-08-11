import {UserContextProvider } from "./UserContext";
import axios from "axios";
import Pages from "./Pages";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
