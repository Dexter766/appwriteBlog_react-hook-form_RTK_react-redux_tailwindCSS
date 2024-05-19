import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  // const posts = useSelector((state) => state.post.posts);

  // useEffect(() => {
  //   if (posts.some((post) => post.status === "inactive")) {  // for fecthing from dbpost
  //     appwriteService.getPosts([]).then((posts) => {
  //       if (posts) {
  //         dispatch(setPosts(posts.documents));
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
              {/* we have to spread post to display all posts*/}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
