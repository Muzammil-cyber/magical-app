import { useEffect, useState } from "react";

import { PostType } from "../types/posts";
import useCookies from "../libs/useCookies";
import YourPost from "../components/YourPost";

const YourPosts = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [isPostUpdated, setIsPostUpdated] = useState<boolean>(false);
  const { getCookie } = useCookies();

  useEffect(() => {
    fetch(`/api/posts?authorId=${getCookie("userId")}`)
      .then(async (res) => {
        const data = await res.json();
        setPosts(data);
        setIsPostUpdated(false);
      })
      .catch((err) => console.log(err));

    // unmount
    return () => {
      setPosts(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostUpdated]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      {posts
        ? posts.map((post) => (
            <YourPost
              key={post.id}
              setIsPostUpdated={setIsPostUpdated}
              {...post}
            />
          ))
        : null}
    </div>
  );
};

export default YourPosts;
