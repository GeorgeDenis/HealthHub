import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { Textarea, Button, IconButton } from "@material-tailwind/react";

import { motion } from "framer-motion";

import { Card, CardBody, Typography } from "@material-tailwind/react";
import UserAvatar from "../../utils/UserAvatar";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import EditIcon from "@mui/icons-material/Edit";
import EditRecipeCommentModal from "./EditRecipeCommentModal";

const RecipeDetailsComments = ({ recipeId }) => {
  const currentUser = useUser();
  const [recipeComments, setRecipeComments] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState({});
  const [editRecipeCommentModalOpen, setEditRecipeCommentModalOpen] =
    useState(false);

  useEffect(() => {
    fetchRecipeComments();
  }, [recipeId]);

  const fetchRecipeComments = async () => {
    try {
      const response = await api.get(
        `https://localhost:7016/api/v1/RecipeComment/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        let commentsConverted = response.data.recipeComments.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
        );
        commentsConverted = response.data.recipeComments.map((comment) => {
          return {
            ...comment,
            createdDate: new Date(comment.createdDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
              },
            ),
          };
        });

        setRecipeComments(commentsConverted);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching recipes comments");
    }
  };
  const handleCancel = () => {
    setComment("");
  };
  const handlePostComment = async () => {
    try {
      const response = await api.post(
        `https://localhost:7016/api/v1/RecipeComment`,
        {
          userId: currentUser.userId,
          recipeId: recipeId,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success("Comment posted successfully");
        fetchRecipeComments();
        setComment("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error posting comment");
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(
        `https://localhost:7016/api/v1/RecipeComment/${commentId}`,
        {
          params: {
            commentId: commentId,
            userId: currentUser.userId,
          },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 204) {
        toast.success("Comment deleted successfully");
        fetchRecipeComments();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting comment", error);
    }
  };
  const handleEditComment = (commentId, comment) => {
    setSelectedComment({ id: commentId, comment: comment });
    handleOpenEditRecipeCommentModal();
  };

  const handleOpenEditRecipeCommentModal = () => {
    setEditRecipeCommentModalOpen(true);
  };
  const handleCloseEditRecipeCommentModal = () => {
    setEditRecipeCommentModalOpen(false);
  };
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-5 flex flex-col gap-3 w-[80%] mx-auto overflow-auto max-h-[40rem]"
      style={{ scrollbarWidth: "none" }}
    >
      <h3 className="text-xl mb-2 font-semibold text-white underline">
        Comments
      </h3>
      <div className="w-full">
        <Textarea
          size="lg"
          variant="outlined"
          label="Add a comment..."
          className="text-white"
          color="green"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment && <p className="text-xs text-white">{comment.length}/1000</p>}
        <div className="flex w-full justify-end item py-1.5">
          {/* <IconButton variant="text" className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton> */}
          <div className="flex gap-2">
            <Button
              size="sm"
              color="red"
              variant="text"
              className="rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-md"
              onClick={handlePostComment}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
      {recipeComments.map((comment) => (
        <Card key={comment.id} className="p-3 bg-green-900 rounded-lg">
          <div className="flex gap-5 items-center justify-between text-white">
            <div className="flex gap-5 items-center">
              <UserAvatar
                photoUrl={comment.createdBy.profilePhotoUrl}
                className={"w-[2.5rem] h-[2.5rem] rounded-full"}
                loadingClassName={
                  "w-[2.5rem] h-[2.5rem] bg-surface-mid-dark rounded-full"
                }
                loadingProps={{ className: "w-5 h-5" }}
              />
              {comment.createdBy.name}
            </div>
            <div className="flex items-center gap-1">
              {currentUser.userId === comment.userId && (
                <>
                  <TrashIcon
                    className="text-green-500 hover:text-red-500 w-5 h-5 cursor-pointer"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                  <PencilIcon
                    className="text-green-500 w-5 h-5  hover:text-blue-500  cursor-pointer"
                    onClick={() => {
                      handleEditComment(comment.id, comment.comment);
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <CardBody className="mt-4 px-6 pt-0">
            <Typography
              variant="small"
              className="font-normal text-surface-light"
            >
              {comment.comment}
            </Typography>
          </CardBody>
          <p className="text-sm text-white ml-auto">{comment.createdDate}</p>
        </Card>
      ))}
      {editRecipeCommentModalOpen && <EditRecipeCommentModal
        editRecipeCommentModalOpen={editRecipeCommentModalOpen}
        handleCloseEditRecipeCommentModal={handleCloseEditRecipeCommentModal}
        commentId={selectedComment.id}
        commentText={selectedComment.comment}
        fetchRecipeComments={fetchRecipeComments}
      />}
    </motion.div>
  );
};

export default RecipeDetailsComments;
