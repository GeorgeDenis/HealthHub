import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import ConversationPreview from "./ConversationPreview";
import ConversationModal from "./ConversationModal";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import api from "../../../services/api";
import SendIcon from "@mui/icons-material/Send";
import AiMessageContainer from "./AiMessageContainer";
const API_KEY = import.meta.env.VITE_OPENAPI_KEY;

const Assistant = () => {
  const currentUser = useUser();
  const [messageList, setMessageList] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  const processMessageToChatGPT = async () => {
    if (inputMessage === "") {
      toast.error("Please enter a message");
      return;
    }

    const newMessageList = [
      ...messageList,
      { message: inputMessage, sender: "User" },
    ];
    setMessageList(newMessageList);
    setInputMessage("");

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputMessage,
        },
      ],
    };

    handleAddChat(inputMessage, "User");

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        const responseMessage = data.choices[0].message.content;
        handleAddChat(responseMessage, "ChatGPT");
        typeWriterEffect(responseMessage);
      });
  };

  const typeWriterEffect = (text) => {
    setIsTyping(true);
    let index = 0;
    let tempMessage = { message: "", sender: "ChatGPT" };

    const interval = setInterval(() => {
      if (index < text.length) {
        tempMessage.message += text[index];
        setMessageList((prevList) => {
          const lastMessage = prevList[prevList.length - 1];
          if (lastMessage && lastMessage.sender === "ChatGPT") {
            lastMessage.message = tempMessage.message;
            return [...prevList.slice(0, -1), lastMessage];
          } else {
            return [...prevList, tempMessage];
          }
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10);
  };
  const handleAddChat = async (message, sender) => {
    try {
      const response = await api.post(
        `/api/v1/AIChat`,
        {
          message,
          userId: currentUser.userId,
          sender,
          aiConversationId: currentConversation.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
    } catch (error) {
      console.error("Error adding chat:", error);
      toast.error("Error adding chat");
    }
  };

  const handleCloseConversation = () => {
    setIsConversationOpen(false);
  };
  const handleOpenConversation = () => {
    setIsConversationOpen(true);
  };
  const handleFetchConversations = async () => {
    try {
      const response = await api.get(
        `/api/v1/AIConversation/byUserId/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setConversations(response.data.aiConversationDtos);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Error fetching conversations");
    }
  };
  useEffect(() => {
    handleFetchConversations();
  }, []);

  const fetchCurrentConversationMessages = async () => {
    try {
      const response = await api.get(
        `/api/v1/AIChat/conversation/${currentConversation.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setMessageList(response.data.aiChats);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    if (currentConversation?.id) {
      fetchCurrentConversationMessages();
    }
  }, [currentConversation]);
  const handleCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <div className="flex flex-col md:flex-row w-[90%] md:w-[70%] lg:w-[85%] items-start justify-start gap-2 bg-[#182c25] p-3 rounded-lg shadow-lg min-h-[600px]">
          <div className="flex flex-col w-full md:w-[40%] h-full items-center justify-start gap-2  p-1">
            <Typography variant="h4" className="text-white font-semibold">
              Conversations
            </Typography>
            <button
              className="w-full p-1 bg-green-500 text-white rounded-lg max-w-[70px]"
              onClick={handleOpenConversation}
            >
              <SmartToyIcon />
            </button>
            <div
              className="flex flex-col gap-2 w-full overflow-auto max-h-[10rem] md:max-h-[30rem]"
              style={{ scrollbarWidth: "none" }}
            >
              {conversations &&
                conversations.map((conversation, index) => (
                  <ConversationPreview
                    key={index}
                    conversation={conversation}
                    handleCurrentConversation={handleCurrentConversation}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col bg-[#306844] gap-5 p-2 rounded-lg min-h-[450px] md:min-h-[600px] flex-grow">
              {/* {messages && ( */}
              <div className="flex flex-col flex-grow">
                <div
                  className="flex flex-col gap-1 overflow-auto h-[24rem] md:h-[34rem] flex-grow"
                  style={{ scrollbarWidth: "none" }}
                >
                  {messageList &&
                    messageList.map((messageObject, index) => (
                      <div key={index}>
                        <AiMessageContainer message={messageObject} />
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {messageList && currentConversation && (
                <div className="flex items-center justify-center p-4 border-t gap-1">
                  <input
                    type="text"
                    placeholder="Input your question"
                    className="w-full border-2 border-gray-300 rounded-lg p-2"
                    value={inputMessage}
                    onChange={handleInputChange}
                    disabled={isTyping}
                  />
                  <button
                    className="bg-green-800 text-white p-2 rounded-lg"
                    onClick={processMessageToChatGPT}
                    disabled={isTyping}
                  >
                    <SendIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConversationModal
        isConversationOpen={isConversationOpen}
        handleCloseConversation={handleCloseConversation}
        fetchConversations={handleFetchConversations}
      />
    </div>
  );
};

export default Assistant;
