import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex items-center justify-center h-full w-full">
      <form className="card glass w-full max-w-2xl min-h-96">
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
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 max-w-sm">
              Password
              <input type="password" className="grow" placeholder="********" />
            </label>
            <label className="input input-bordered flex items-center gap-2 max-w-sm">
              Confirm Password
              <input type="password" className="grow" placeholder="********" />
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
