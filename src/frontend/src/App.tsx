import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import AddPost from "./pages/AddPost";
import YourPosts from "./pages/YourPosts";
import { useContext } from "react";
import { AuthContext } from "./libs/AuthContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/add-post"
          element={isAuthenticated ? <AddPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/your-posts"
          element={isAuthenticated ? <YourPosts /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<div>404 Not Found</div>} />{" "}
      </Routes>
    </Layout>
  );
}

export default App;
