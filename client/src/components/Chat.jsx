import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { UserContext } from "../UserContext.jsx";
import { uniqBy } from "lodash";
import axios from "axios";
import Contact from "./Contact";
import RegisterAndLogin from "./RegisterAndLogin";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id, setId, setUserName } = useContext(UserContext);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessaages = useRef();

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  function connectToWs() {
    const ws = new WebSocket("wss://mern-chat-v5l9.onrender.com");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Reconnecting...");
        connectToWs();
      }, 1000);
    });
  }

  useEffect(() => {
    if (selectedUserId) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    axios.get("/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      // console.log(offlinePeople);
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  function showOnlinePeople(people) {
    const peopleSet = {};
    people.forEach(({ userId, username }) => {
      peopleSet[userId] = username;
    });
    setOnlinePeople(peopleSet);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  }

  function sendMessage(ev) {
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
      })
    );
    setNewMessageText("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
  }

  useEffect(() => {
    const div = divUnderMessaages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth",block:'end'});
    }
  }, [messages]);

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, "_id");

  function logout() {
    axios.post("/logout").then(() => {
      setWs(null);
      setId(null);
      setUserName(null);
      return <RegisterAndLogin/>
    });
  }

  return (
    <div className="flex h-screen">
      <div className="bg-white-100 w-1/3 flex flex-col">
        <div className="flex-grow">
          <Logo />
          {Object.keys(onlinePeopleExclOurUser).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={true}
              onClick={() => setSelectedUserId(userId)}
              username={onlinePeopleExclOurUser[userId]}
              selected={userId === selectedUserId}
            />
          ))}
          {Object.keys(offlinePeople).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={false}
              onClick={() => setSelectedUserId(userId)}
              username={offlinePeople[userId].username}
              selected={userId === selectedUserId}
            />
          ))}
        </div>
        <div className="p-2 text-center">
          <span className="mr-2 text-sm text-gray-500">
            Logged in as {username}
          </span>
          <button
            onClick={logout}
            className="p-2 mb-2 text-white bg-black border rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-blue-50 w-2/3 p-2 flex flex-col">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex flex-grow h-full items-center justify-center">
              <div className="text-black-100">
                &larr; No Person Selected, Select from Side Bar
              </div>
            </div>
          )}
          {selectedUserId && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute inset-0">
                {messagesWithoutDupes.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      key={index}
                      className={
                        "text-left inline-block p-2 m-2 rounded-md text-sm " +
                        (message.sender === id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500")
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessaages}></div>
              </div>
            </div>
          )}
        </div>
        {selectedUserId && (
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessageText}
              placeholder="Type the Message"
              className="bg-white-100 p-2 flex-grow rounded-sm"
              onChange={(ev) => setNewMessageText(ev.target.value)}
            />
            <button type="submit" className="p-2 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
