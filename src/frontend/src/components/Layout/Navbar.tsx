import { Link } from "react-router-dom";
import useAuth from "../../libs/useAuth";
import Avatar from "./Avatar";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="cursor-pointer font-bold text-xl">
          Magical
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <Avatar />
        ) : (
          <div className="flex gap-2">
            <Link to={"/login"} className="btn btn-primary text-white">
              Login
            </Link>
            <Link
              to={"/register"}
              className="btn btn-outline btn-primary hover:!text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
