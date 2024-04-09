import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { PostType } from "../types/posts";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    fetch("/api/posts").then(async (res) => setPosts(await res.json()));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {posts ? posts.map((post) => <PostCard key={post.id} {...post} />) : null}
    </div>
  );
};

export default Home;
