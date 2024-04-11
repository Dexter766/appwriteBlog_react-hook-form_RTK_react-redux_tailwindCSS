import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => {
    return state.post.posts.find((post) => post.$id === slug);
  });

  useEffect(() => {
    if (!slug || !post) {
      //   appwriteService.getPost(slug).then((post) => {
      //     if (post) {
      //       setPost(post);
      //     }
      //   });
      // } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // useEffect(() => {
  //   if (slug) {
  //     appwriteService.getPost(slug).then((post) => {
  //       if (post) {
  //         setPost(post);
  //       }
  //     });
  //   } else {
  //     navigate("/");
  //   }
  // }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
