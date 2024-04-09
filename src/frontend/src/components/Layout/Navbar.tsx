import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import { useContext } from "react";
import { AuthContext } from "../../libs/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
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
