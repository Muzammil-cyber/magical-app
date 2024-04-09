import { PostType } from "../types/posts";

const PostCard = (props: PostType) => {
  return (
    <div className="card w-full max-w-2xl bg-base-100 border-2 border-primary">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
