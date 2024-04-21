import { useUser } from "@/context/LoginRequired";
import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import SendMessageForm from "./SendMessageForm";
import UserAvatar from "../utils/UserAvatar";
import MessageReversed from "./MessageReversed";
import MessageContainer from "./MessageContainer";

const ChatPreview = ({ joinChat, receiver, setReceiver, fetchMessages }) => {
  const currentUser = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex items-center justify-between bg-green-700 w-full rounded-lg p-2 cursor-pointer text-white hover:bg-green-200"
        onClick={() => {
          fetchMessages(receiver.userId);
          joinChat(currentUser.userId, receiver.userId);
          setReceiver(receiver.userId);
        }}
      >
        <div className="flex items-center">
          <UserAvatar
            photoUrl={receiver.profilePictureUrl}
            className={"w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer"}
            loadingClassName={
              "w-[2.5rem] h-[2.5rem] bg-surface-mid-dark rounded-full"
            }
            loadingProps={{ className: "w-5 h-5" }}
            onClick={() => navigate(`/dashboard/profile/${receiver.userId}`)}
          />
          {receiver.username}
          {/* <div className="flex flex-col ml-2">
            <p>{receiver && receiver.username}</p>
            <p className="text-white text-sm">Hello</p>
          </div> */}
        </div>
        <div>
          <p className="text-white text-sm">12:00</p>
        </div>
      </div>
    </div>
  );
};
const ChatPanel = ({
  joinChat,
  setReceiver,
  messages,
  setMessages,
  sendMessage,
  receiver,
}) => {
  const currentUser = useUser();
  const endOfMessagesRef = useRef(null);
  const [chatPreview, setChatPreview] = useState([]);
  const fetchMessages = async (receiverId) => {
    try {
      const response = await api.get(
        `api/v1/Messages?userId1=${currentUser.userId}&userId2=${receiverId}`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        },
      );
      if (response.status === 200) {
        setMessages(null);
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    }
  };
  const fetchPreview = async () => {
    try {
      const response = await api.get(`/api/v1/Messages/${currentUser.userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      if (response.status === 200) {
        setChatPreview(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    }
  };
  useEffect(() => {
    fetchPreview();
  }, []);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);
  return (
    <div className="flex w-[70%] md:w-[85%] lg:w-[90%] items-center justify-start gap-2 bg-[#0b6e4f] p-3 rounded-lg shadow-lg min-h-[600px]">
      <div className="flex flex-col w-[40%] h-full items-center justify-start gap-2  border-r border-r-white p-1">
        <Typography variant="h4" className="text-white font-semibold">
          Messages
        </Typography>
        <div className="flex flex-col gap-2 w-full min-h-[600px]">
          {chatPreview &&
            chatPreview.map((user, index) => {
              return (
                <ChatPreview
                  key={index}
                  joinChat={joinChat}
                  receiver={user}
                  setReceiver={setReceiver}
                  fetchMessages={fetchMessages}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div
          className="flex flex-col  bg-green-700 gap-5 p-2 rounded-lg overflow-auto min-h-[600px] max-h-[36rem]"
          style={{ scrollbarWidth: "none" }}
        >
          {messages &&
            messages.map((msg, index) => {
              const isLastMessage = index === messages.length - 1;
              if (msg.sender === currentUser.userId) {
                return isLastMessage ? (
                  <MessageReversed
                    ref={endOfMessagesRef}
                    key={index}
                    message={msg}
                    chatPreview={chatPreview}
                  />
                ) : (
                  <MessageReversed
                    key={index}
                    message={msg}
                    chatPreview={chatPreview}
                  />
                );
              } else {
                return isLastMessage ? (
                  <MessageContainer
                    ref={endOfMessagesRef}
                    key={index}
                    message={msg}
                    chatPreview={chatPreview}
                  />
                ) : (
                  <MessageContainer
                    key={index}
                    message={msg}
                    chatPreview={chatPreview}
                  />
                );
              }
            })}
        </div>
        <SendMessageForm
          sendMessage={sendMessage}
          username={currentUser.userId}
          receiver={receiver}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
