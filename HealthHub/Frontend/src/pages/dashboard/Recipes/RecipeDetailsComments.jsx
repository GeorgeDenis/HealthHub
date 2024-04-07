import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import { Input } from '@material-tailwind/react';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import UserAvatar from "../utils/UserAvatar";
import { TrashIcon } from "@heroicons/react/24/solid";
import EditIcon from "@mui/icons-material/Edit";

const RecipeDetailsComments = ({ recipeId }) => {
  const currentUser = useUser();
  const [recipeComments, setRecipeComments] = useState([]);

  useEffect(() => {
    fetchRecipeComments();
  }, [recipeId]);

  const fetchRecipeComments = async () => {
    console.log("fetching comments", currentUser);
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
  return (
    <div
      className="mt-5 flex flex-col gap-3 w-[80%] mx-auto overflow-auto max-h-[40rem]"
      style={{ scrollbarWidth: "none" }}
    >
      <Input
        size="lg"
        placeholder="Add a comment..."
        className="!border-secondary text-surface-light placeholder-surface-mid-light focus:!border-secondary"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        // onChange={handleChange}
        crossOrigin={undefined}
        icon={
          <i
            className={"fa-regular fa-paper-plane cursor-pointer text-surface-mid-light hover:text-surface-light"}
          />
      }
      />
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
              <p className="text-sm">{comment.createdDate}</p>
              {currentUser.userId === comment.userId && (
                <>
                  <TrashIcon className="text-red-500 w-5 h-5 cursor-pointer" />
                  <EditIcon className="text-green-500 w-4 h-4 cursor-pointer" />
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
        </Card>
      ))}
    </div>
  );
};

export default RecipeDetailsComments;
