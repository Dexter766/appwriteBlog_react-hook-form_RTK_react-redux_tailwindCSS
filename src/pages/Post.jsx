import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import { removePost, setPosts } from "../store/postSlice";

const Post = () => {
  // const [post, setPost] = useState(null);
  const [newlikes, setLikes] = useState(0);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => {
    return state.post.posts.find((post) => post.$id === slug);
  });

  useEffect(() => {
    if (!slug || !post) {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.documents));
        } else navigate("/");
      });
    } else {
      if (post) setLikes(post.likes);
    }
  }, [slug, navigate]);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // useEffect(() => {
  //   if (slug) {
  //     appwriteService.getPost(slug).then((post) => {
  //       if (post) {
  //         setPost(post);
  //         setLikes(post.likes);
  //       } else navigate("/");
  //     });
  //   } else navigate("/");
  // }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
    dispatch(removePost({ ...post }));
  };

  const handleLike = async () => {
    try {
      const updatedPost = await appwriteService.likePost(post.$id);
      setLikes(updatedPost.likes);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  // const handleUnlike = async () => {
  //   try {
  //     const updatedPost = await appwriteService.unlikePost(post.$id);
  //     setLikes(updatedPost.likes);
  //   } catch (error) {
  //     console.error("Failed to unlike post:", error);
  //   }
  // };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        <div className="flex mt-3 items-center">
          <Button onClick={handleLike} className="bg-lime-600">
            Like
          </Button>
          {/* <Button onClick={handleUnlike} className="unlike-button">
            Unlike
          </Button> */}
          <h4 className="ml-3 text-2xl font-bold">{newlikes} Likes</h4>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;