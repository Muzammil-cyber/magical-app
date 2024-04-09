import React, { useEffect, useState } from "react";
import useCookies from "../libs/useCookies";

interface AddPostType {
  title: string;
  content: string;
}

const AddPost: React.FC = () => {
  const { getCookie } = useCookies();
  const [postDetails, setPostDetails] = useState<AddPostType>({
    title: "",
    content: "",
  });
  const [error, setError] = useState<AddPostType>({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error.title || error.content) {
      return;
    }
    const authorId = getCookie("userId");
    if (!authorId) {
      throw new Error("User not logged in");
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postDetails.title,
        content: postDetails.content,
        authorId,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setError({
      title: !postDetails.title ? "Title is required" : "",
      content: !postDetails.content ? "Content is required" : "",
    });
  }, [postDetails]);

  return (
    <section className="flex items-center justify-center h-full w-full">
      <form
        className="card glass w-full max-w-2xl min-h-96"
        onSubmit={handleSubmit}
      >
        <div className="card-body gap-2">
          <h2 className="card-title text-2xl uppercase">Add Post</h2>
          <label className="input input-bordered flex items-center gap-2 ">
            Title:
            <input
              type="text"
              className="grow"
              placeholder="Magical Title"
              value={postDetails.title}
              onChange={(e) =>
                setPostDetails({
                  ...postDetails,
                  title: e.target.value,
                })
              }
            />
          </label>

          <div>
            <textarea
              className="textarea textarea-bordered textarea-lg w-full "
              value={postDetails.content}
              placeholder="Magical Content"
              onChange={(e) =>
                setPostDetails({
                  ...postDetails,
                  content: e.target.value,
                })
              }
            />
            <div className=" card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary text-white w-full ${
                  error.content || error.title ? " btn-disabled" : ""
                }`}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddPost;
