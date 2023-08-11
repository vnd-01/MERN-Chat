import React from "react";

const Avatar = ({ online, userId, username }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-violet-200",
    "bg-purple-500",
    "bg-yellow-200",
    "bg-teal-200",
  ];
  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;

  const color = colors[colorIndex];
  return (
    <div
      className={"w-10 h-10 relative rounded-full flex items-center " + color}
    >
      <div className="text-center w-full opacity-70">{username[0]}</div>
      {online && (
        <div className="absolute w-3 h-3 bg-green-500 bottom-0 right-0 rounded-full border-white"></div>
      )}
      {!online && (
        <div className="absolute w-3 h-3 bg-gray-500 bottom-0 right-0 rounded-full border-white"></div>
      )}
    </div>
  );
};

export default Avatar;
