import { useEffect, useState } from "react";
import { PostType } from "../types/posts";

const PostCard = (props: PostType) => {
  // Get Posted that many days or hours or miniutes or seconds a ago
  const getPostedTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const currentDate = new Date();
    const diff = currentDate.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  // Fetch author username from server
  const [author, setAuthor] = useState<string>();
  useEffect(() => {
    fetch(`/api/users/${props.authorId}`).then(async (res) => {
      const { username } = await res.json();
      setAuthor(username);
    });
    // unmount
    return () => {
      setAuthor(undefined);
    };
  }, [props.authorId]);

  return (
    <div className="card glass w-full max-w-2xl  border-2 border-primary">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="">{props.content}</p>
        <div className="card-actions justify-end opacity-50">
          {getPostedTime(props.createdAt)}{" "}
          <span className="font-semibold capitalize">by {author}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
