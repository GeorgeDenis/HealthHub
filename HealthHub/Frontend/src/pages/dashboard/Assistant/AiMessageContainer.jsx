import React from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const AiMessageContainer = ({ message }) => {
  return (
    <>
      {message.sender === "ChatGPT" && (
        <div className="flex justify-start text-white">
          <SmartToyIcon />
        </div>
      )}
      <div
        className={`flex ${
          message.sender === "ChatGPT" ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`${
            message.sender === "ChatGPT" ? "bg-green-900" : "bg-green-800"
          }  p-2 rounded-lg max-w-[25rem] text-white`}
        >
          <p>{message.message}</p>
        </div>
      </div>
    </>
  );
};

export default AiMessageContainer;
