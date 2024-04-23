import React from "react";
import { getLocalTime } from "./getLocalTime";
import { Tooltip } from "@material-tailwind/react";
const MessageReversed = React.forwardRef(({ message }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center gap-2 w-full justify-end cursor-pointer"
    >
      <Tooltip
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        content={
          <div className="w-28 text-center ">{getLocalTime(message.date)}</div>
        }
      >
        <p className="text-[#e1e1e1] py-1 px-3 bg-[#55915f] rounded-2xl  text-justify max-w-[90%] md:max-w-[70%]">
          {message.content}
        </p>
      </Tooltip>

      {/* <p>{message.date.split["T"]}</p> */}
      {/* <img
        src="../../../../public/img/bruce-mars.jpeg"
        alt=""
        className="h-10 w-10 rounded-full"
      /> */}
    </div>
  );
});
export default MessageReversed;
