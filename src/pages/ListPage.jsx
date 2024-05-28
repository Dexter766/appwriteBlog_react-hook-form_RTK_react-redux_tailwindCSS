import React from "react";
import { PostCard } from "../components";

const ListPage = ({ searchResults }) => {
  const results = searchResults.map((post) => (
    <div key={post.$id} className="p-2 w-1/4">
      <PostCard {...post} />
      {/* we have to spread post because we are destructuring it in PostCard */}
    </div>
  ));
  const content = results.length ? results : <div>No Matching Post</div>;

  return (
    <main>
      <div className="flex flex-wrap">{content}</div>
    </main>
  );
};

export default ListPage;
