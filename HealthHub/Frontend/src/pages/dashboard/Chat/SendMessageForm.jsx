import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";

const SendMessageForm = ({ sendMessage, username, receiver }) => {
  const [msg, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmoji(false);
      }
    };

    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(username, receiver, msg);
        setMessage("");
      }}
      className="div gap-4 flex items-center justify-center w-full relative"
    >
      <input
        type="text"
        value={msg}
        className="p-2 rounded-lg w-[60%] border-2 border-green-600"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="p-4 w-14 h-10 bg-green-800 rounded-lg flex items-center justify-center text-white"
      >
        <SendIcon />
      </button>
      <div className="relative">
        <button type="button" onClick={() => setShowEmoji((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faFaceSmileWink}
            className="w-7 h-7 text-white"
          />
        </button>
        {showEmoji && (
          <div
            className="absolute bottom-10 left-6 translate-y-0 translate-x-[-100%] z-50"
            ref={emojiPickerRef}
          >
            <Picker
              onEmojiSelect={(emoji) => {
                console.log(emoji);
                setMessage((prev) => prev + emoji.native);
              }}
              perLine={7}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default SendMessageForm;
