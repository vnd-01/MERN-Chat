import React from "react";
import Avatar from "./Avatar";

const Contact = ({ id, onClick, username, selected,online }) => {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={
        " pl-2 border-b border-gray-300 py-2 flex items-center gap-2 cursor-pointer " +
        (selected ? "bg-red-200" : "")
      }
    >
      <Avatar online={online} username={username} userId={id} />
      <span className="text-gray-700">{username}</span>
    </div>
  );
};

export default Contact;
