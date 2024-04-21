import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
const SendMessageForm = ({ sendMessage, username, receiver }) => {
  const [msg, setMessage] = useState("");
  useEffect(() => {}, [username, receiver]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(username, receiver, msg);
        setMessage("");
      }}
      className="div gap-4 flex items-center justify-center w-full"
    >
      <input
        type="text"
        value={msg}
        className="p-2 rounded-lg w-[60%]"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="p-4 w-14 h-10 bg-green-800 rounded-lg flex items-center justify-center text-white"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default SendMessageForm;
