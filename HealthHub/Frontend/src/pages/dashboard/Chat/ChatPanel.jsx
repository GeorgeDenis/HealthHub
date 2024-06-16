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
import SearchUsers from "./SearchUsers";

const ChatPreview = ({ joinChat, receiver, setReceiver, fetchMessages }) => {
  const currentUser = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex items-center justify-between bg-[#306844] w-full rounded-lg p-2 cursor-pointer text-white hover:bg-green-200"
        onClick={() => {
          fetchMessages(receiver.userId);
          joinChat(currentUser.userId, receiver.userId);
          setReceiver(receiver.userId);
        }}
      >
        <div className="flex items-center gap-1">
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
        console.log("chat preview", response.data.users);
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
    <div className="flex flex-col md:flex-row w-[90%] md:w-[70%] lg:w-[85%] items-start justify-start gap-2 bg-[#182c25] p-3 rounded-lg shadow-lg min-h-[600px]">
      <div className="flex flex-col w-full md:w-[40%] h-full items-center justify-start gap-2  p-1">
        <Typography variant="h4" className="text-white font-semibold">
          Messages
        </Typography>
        <SearchUsers
          joinChat={joinChat}
          fetchMessages={fetchMessages}
          setReceiver={setReceiver}
        />
        <div
          className="flex flex-col gap-2 w-full overflow-auto max-h-[10rem] md:max-h-[30rem]"
          style={{ scrollbarWidth: "none" }}
        >
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
        <div className="flex flex-col bg-[#306844] gap-5 p-2 rounded-lg min-h-[450px] md:min-h-[600px] flex-grow">
          {messages && (
            <div className="flex flex-col flex-grow">
              <div
                className="flex flex-col gap-1 overflow-auto h-[24rem] md:h-[34rem] flex-grow"
                style={{ scrollbarWidth: "none" }}
              >
                {!receiver && (
                  <img
                    className="h-[250px] md:h-[400px] w-[500px] mx-auto my-auto"
                    src="../../../public/img/chat_banner.png"
                  />
                )}
                {messages.map((msg, index) => {
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
            </div>
          )}
          {receiver && (
            <SendMessageForm
              sendMessage={sendMessage}
              username={currentUser.userId}
              receiver={receiver}
              fetchPreview={fetchPreview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
