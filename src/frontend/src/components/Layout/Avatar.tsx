import { useContext } from "react";
import { AuthContext } from "../../libs/AuthContext";
import { Link } from "react-router-dom";

const Avatar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar Profile Picture"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link to={"/your-posts"}>Your Posts</Link>
        </li>
        <li>
          <Link to={"/add-post"}>Add Post</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
