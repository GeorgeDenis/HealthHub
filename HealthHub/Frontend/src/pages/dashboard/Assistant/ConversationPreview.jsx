import React from "react";

const ConversationPreview = ({ conversation, handleCurrentConversation }) => {

  return (
    <div>
      <div
        className="flex items-center justify-between bg-[#306844] w-full rounded-lg p-2 cursor-pointer text-white hover:bg-green-200"
        onClick={() => handleCurrentConversation(conversation)}
      >
        <div className="flex items-center gap-1">{conversation?.name}</div>
      </div>
    </div>
  );
};

export default ConversationPreview;
