import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorIcon from "../icons/ErrorIcon";
import { AuthContext } from "../libs/AuthContext";

interface LoginDetailsType {
  username?: string;
  password?: string;
}

const Login = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetailsType>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<LoginDetailsType>({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the username and password are not empty, Check if username is longer than 3 characters and password is longer than 8 characters
    if (error.password || error.username) {
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginDetails.username,
        password: loginDetails.password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      login(data.body.user.id);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setError({
      username: !loginDetails.username
        ? "Username is required"
        : loginDetails.username.length < 3
        ? "Username must be at least 3 characters"
        : "",
      password: !loginDetails.password
        ? "Password is required"
        : loginDetails.password.length < 8
        ? "Password must be at least 8 characters"
        : "",
    });
  }, [loginDetails]);

  return (
    <section className="flex items-center justify-center h-full w-full">
      <form
        className="card glass w-full max-w-2xl min-h-96"
        onSubmit={handleSubmit}
      >
        <div className="card-body gap-2">
          <h2 className="card-title text-2xl uppercase">Login</h2>
          <h3 className=" opacity-50">
            Enter your email and password to access the platform.
          </h3>

          <div className="flex flex-col gap-4 mt-4 justify-center flex-auto">
            <label className="input input-bordered flex items-center gap-2 max-w-sm">
              Username
              <input
                type="text"
                className="grow"
                placeholder="magical-username"
                value={loginDetails.username}
                onChange={(e) =>
                  setLoginDetails({
                    ...loginDetails,
                    username: e.target.value,
                  })
                }
              />
              <div className="tooltip" data-tip={error?.username}>
                <span className="label-text-alt">
                  {error?.username && <ErrorIcon className="fill-error" />}
                </span>
              </div>
            </label>
            <label className="input input-bordered flex items-center gap-2 max-w-sm">
              Password
              <input
                type="password"
                className="grow"
                placeholder="********"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({
                    ...loginDetails,
                    password: e.target.value,
                  })
                }
              />
              <div className="tooltip" data-tip={error?.password}>
                <span className="label-text-alt">
                  {error?.password && (
                    <ErrorIcon className="fill-error animate-pulse" />
                  )}
                </span>
              </div>
            </label>

            <Link to={"/register"} className="link link-hover opacity-50">
              Don&apos;t have an account? &rarr;
            </Link>
          </div>
          <div className="flex-grow flex gap-2 items-end">
            <Link
              to={"/register"}
              className="btn btn-secondary hidden sm:block sm:w-1/2"
            >
              Register
            </Link>
            <button
              type="submit"
              className="btn btn-primary text-white w-full sm:w-1/2"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
