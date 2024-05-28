import React from "react";
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice";
import ListPage from "./ListPage";
import SearchBar from "../components/SearchBar";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state) => state.post.posts);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      setLoading(true);
      appwriteService
        .getPosts()
        .then((post) => {
          if (post) {
            dispatch(setPosts(post.documents));
            setSearchResults(post.documents);
          }
        })
        .catch((error) => console.error("Failed to fetch posts:", error))
        .finally(() => setLoading(false));
    }
  }, []);

  //if(posts.length===0 && !loading)
  if (posts.length == 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-200">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {loading && (
        <div className="mt-4 text-center text-2xl font-bold hover:text-white">
          Loading please wait...{" "}
        </div>
      )}

      <Container>
        <SearchBar posts={posts} setSearchResults={setSearchResults} />
        <ListPage
          searchResults={searchResults.length > 0 ? searchResults : posts}
        />
        {/* <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
              
            </div>
          ))}
        </div> */}
      </Container>
    </div>
  );
};

export default Home;
