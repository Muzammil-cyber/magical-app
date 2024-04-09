import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorIcon from "../icons/ErrorIcon";
import { AuthContext } from "../libs/AuthContext";

interface RegisterDetailsType {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState<RegisterDetailsType>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<RegisterDetailsType>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the username and password are not empty, Check if username is longer than 3 characters and password is longer than 8 characters
    if (error.password || error.username || error.confirmPassword) {
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerDetails.username?.toLowerCase(),
        password: registerDetails.password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      login();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setError({
      username: !registerDetails.username
        ? "Username is required"
        : registerDetails.username.length < 3
        ? "Username must be at least 3 characters"
        : "",
      password: !registerDetails.password
        ? "Password is required"
        : registerDetails.password.length < 8
        ? "Password must be at least 8 characters"
        : "",
      confirmPassword:
        registerDetails.password !== registerDetails.confirmPassword
          ? "Passwords do not match"
          : "",
    });
  }, [registerDetails]);
  return (
    <section className="flex items-center justify-center h-full w-full">
      <form
        className="card glass w-full max-w-2xl min-h-96"
        onSubmit={handleSubmit}
      >
        <div className="card-body gap-2">
          <h2 className="card-title text-2xl uppercase">Register</h2>
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
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
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
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    password: e.target.value,
                  })
                }
              />
              <div className="tooltip" data-tip={error?.password}>
                <span className="label-text-alt">
                  {error?.password && <ErrorIcon className="fill-error" />}
                </span>
              </div>
            </label>
            <label className="input input-bordered flex items-center gap-2 max-w-sm">
              Confirm Password
              <input
                type="password"
                className="grow"
                placeholder="********"
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <div className="tooltip" data-tip={error?.confirmPassword}>
                <span className="label-text-alt">
                  {error?.confirmPassword && (
                    <ErrorIcon className="fill-error" />
                  )}
                </span>
              </div>
            </label>
            <Link to={"/login"} className="link link-hover opacity-50">
              Already have an account? &rarr;
            </Link>
          </div>
          <div className="flex-grow flex gap-2 items-end">
            <Link
              to={"/login"}
              className="btn btn-secondary hidden sm:block sm:w-1/2"
            >
              Login
            </Link>
            <button
              type="submit"
              className="btn btn-primary text-white w-full sm:w-1/2"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
