import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import ListPage from "./ListPage";

const AllPosts = () => {
  // const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const posts = useSelector((state) => state.post.posts);
  // // looping through to check if post status is inactive fetch from db
  // posts.forEach((post) => {post.status === "inactive" && appwriteService.getPosts([]).then((posts) => {if (posts) {dispatch(setPosts(posts.documents));}});});
  useEffect(() => {
    if (posts.length === 0) {
      // for fecthing from dbpost
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.documents));
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   if (posts.length === 0) {
  //     appwriteService.getPosts([]).then((posts) => {
  //       if (posts) {
  //         setPosts(posts.documents);
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <SearchBar posts={posts} setSearchResults={setSearchResults} />
        <ListPage
          searchResults={searchResults.length > 0 ? searchResults : posts}
        />
      </Container>
    </div>
  );
};

export default AllPosts;
