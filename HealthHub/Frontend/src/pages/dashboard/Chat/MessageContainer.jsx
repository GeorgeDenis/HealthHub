import React from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../utils/UserAvatar";
import { getLocalTime } from "./getLocalTime";
const MessageContainer = React.forwardRef(({ message, chatPreview }, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className="flex items-center gap-2 w-full">
      {chatPreview
        .filter((user) => user.userId === message.sender)
        .map((user, index) => {
          return (
            <UserAvatar
              key={index}
              photoUrl={user.profilePictureUrl}
              className={"w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer"}
              loadingClassName={
                "w-[2.5rem] h-[2.5rem] bg-surface-mid-dark rounded-full"
              }
              loadingProps={{ className: "w-5 h-5" }}
              onClick={() => navigate(`/dashboard/profile/${user.userId}`)}
            />
          );
        })}
      <p className="text-white p-1 bg-green-500 rounded-lg text-justify max-w-[70%]">
        {message.content}
      </p>
      {message && <p className="text-white">{getLocalTime(message.date)}</p>}
    </div>
  );
});

export default MessageContainer;
