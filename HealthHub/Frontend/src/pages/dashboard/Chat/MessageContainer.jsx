import React from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../utils/UserAvatar";
import { getLocalTime } from "./getLocalTime";
import { Tooltip } from "@material-tailwind/react";
const MessageContainer = React.forwardRef(({ message, chatPreview }, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className="flex items-center gap-2 w-full cursor-pointer">
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
      <Tooltip
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        content={
          <div className="w-28 text-center">{getLocalTime(message.date)}</div>
        }
      >
        <p className="text-[#e1e1e1] py-1 px-3 bg-[#55915f] rounded-2xl text-wrap text-balance max-w-[15rem]">
          {message.content}
        </p>
      </Tooltip>
    </div>
  );
});

export default MessageContainer;
