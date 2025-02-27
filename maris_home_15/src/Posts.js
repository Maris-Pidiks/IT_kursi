import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    if (showPosts) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data.slice(0, 10)));

      const timer = setTimeout(() => {
        setPosts([]);
        setShowPosts(false);
      }, 5000); // Clear posts after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when showPosts changes
    }
  }, [showPosts]);

  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <div>
      <button onClick={togglePosts}>{showPosts ? "Hide Posts" : "Show Posts"}</button>
      {showPosts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
