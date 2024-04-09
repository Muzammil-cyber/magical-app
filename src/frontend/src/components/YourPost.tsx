import { PostType } from "../types/posts";
import TrashIcon from "../icons/TrashIcon";
import useCookies from "../libs/useCookies";

interface PostProps extends PostType {
  setIsPostUpdated: (isPostUpdated: boolean) => void;
}

const YourPost = (props: PostProps) => {
  const { getCookie } = useCookies();
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
  const onDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorId: getCookie("userId") }),
      });
      if (res.ok) {
        props.setIsPostUpdated(true);
        // window.location.reload();
      } else {
        console.log(await res.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card glass w-full max-w-2xl  border-2 border-primary">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="">{props.content}</p>
        <div className="card-actions justify-between opacity-50">
          {getPostedTime(props.createdAt)}{" "}
          <button className="btn" onClick={onDelete}>
            <TrashIcon className="fill-red-700 hover:fill-rose-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourPost;
