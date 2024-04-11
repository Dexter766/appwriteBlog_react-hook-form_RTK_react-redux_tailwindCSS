import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";
import appwriteService from "../appwrite/conf";

const PostCard = ({ $id, title, featuredImage, likes }) => {
  // in appwrite it will be $id
  const [newlikes, setLikes] = useState(likes);

  const handleLike = async () => {
    try {
      const updatedPost = await appwriteService.likePost($id);
      setLikes(updatedPost.likes);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const updatedPost = await appwriteService.unlikePost($id);
      setLikes(updatedPost.likes);
    } catch (error) {
      console.error("Failed to unlike post:", error);
    }
  };

  return (
    <div className="post-card">
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
          <div className="w-full justify-center mb-4">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl"
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
      {/* <div className="flex mt-2 items-center">
        <Button onClick={handleLike} className="bg-lime-600">
          Like
        </Button>
        <Button onClick={handleUnlike} className="ml-3">
          Unlike
        </Button>
        <h4 className="ml-3 text-xl font-bold">{newlikes} Likes</h4>
      </div> */}
    </div>
  );
};

export default PostCard;
