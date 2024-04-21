import React from "react";
import { getLocalTime } from "./getLocalTime";
const MessageReversed = React.forwardRef(({ message }, ref) => {

  return (
    <div ref={ref} className="flex items-center gap-2 w-full justify-end">
      {message && <p className="text-white">{getLocalTime(message.date)}</p>}
      <p className="text-white p-1 bg-green-500 rounded-lg text-justify max-w-[70%]">
        {message.content}
      </p>
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
