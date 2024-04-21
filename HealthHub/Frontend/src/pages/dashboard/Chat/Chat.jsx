import { useState, useEffect } from "react";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import { useUser } from "@/context/LoginRequired";
import ChatPanel from "./ChatPanel";
function Chat() {
  const currentUser = useUser();
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  useEffect(() => {
    return () => {
      if (conn) {
        conn
          .stop()
          .catch((err) => console.error("Error stopping connection:", err));
      }
    };
  }, [conn]);

  const joinChat = async (userId, receiver) => {
    if (conn) {
      await conn.stop();
    }
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7016/chat")
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", (userId, msg) => {
      setMessages((prev) => [
        ...prev,
        { sender: userId, content: msg, date: new Date().toISOString() },
      ]);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", currentUser.userId, receiver);
      setConnection(connection);
    } catch (error) {
      console.error("Could not connect to chat!", error);
    }
  };

  const sendMessage = async (username, receiver, msg) => {
    try {
      await conn.invoke("SendMessageToUser", username, receiver, msg);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full">
      <main>
        <div className="flex flex-col items-center justify-center w-full gap-10">
          <ChatPanel
            joinChat={joinChat}
            setReceiver={setReceiver}
            messages={messages}
            sendMessage={sendMessage}
            setMessages={setMessages}
            receiver={receiver}
          />
        </div>
      </main>
    </div>
  );
}

export default Chat;
