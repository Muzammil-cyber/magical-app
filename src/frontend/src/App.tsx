import { useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";

function App() {
  useEffect(() => {
    fetch("/api/users").then(async (res) => {
      const data = await res.json();
      console.log(
        data.map((user: { id: string; username: string }) => user.username)
      );
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404 Not Found</div>} />{" "}
      </Routes>
    </Layout>
  );
}

export default App;
