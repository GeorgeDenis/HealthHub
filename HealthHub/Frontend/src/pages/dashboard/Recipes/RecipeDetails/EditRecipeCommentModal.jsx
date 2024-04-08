import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useUser } from "@/context/LoginRequired";
import { Textarea, Button } from "@material-tailwind/react";

const EditRecipeCommentModal = ({
  editRecipeCommentModalOpen,
  handleCloseEditRecipeCommentModal,
  commentId,
  commentText,
  fetchRecipeComments,
}) => {
  const currentUser = useUser();
  const [comment, setComment] = useState("");
  useEffect(() => {
    setComment(commentText);
  }, [commentText]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleCancel = () => {
    setComment(commentText);
  };
  const handleUpdateComment = async () => {
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty.");
      return;
    }
    if (comment.length > 1000) {
      toast.error("Comment cannot be more than 1000 characters.");
      return;
    }
    try {
      const response = await api.put(
        `https://localhost:7016/api/v1/RecipeComment/${commentId}`,
        { id: commentId, comment, userId: currentUser.userId },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Comment updated successfully.");
        fetchRecipeComments();
        handleCloseEditRecipeCommentModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later." + error.message);
    }
  };
  return (
    <Modal
      open={editRecipeCommentModalOpen}
      onClose={handleCloseEditRecipeCommentModal}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[35rem] min-h-[15rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
        <Textarea
          size="lg"
          variant="outlined"
          label="Edit comment..."
          className="text-white min-h-[10rem]"
          color="green"
          value={comment}
          onChange={handleChange}
        />
        {comment && <p className="text-xs text-white">{comment.length}/1000</p>}

        <div className="flex w-full justify-end item py-1.5">
          <div className="flex gap-2">
            <Button
              size="sm"
              color="red"
              variant="text"
              className="rounded-md"
              onClick={handleCancel}
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="rounded-md"
              onClick={handleUpdateComment}
            >
              Update Comment
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditRecipeCommentModal;
