import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./Login";
import PostsList from "./PostsList";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import NavigationBar from "./NavBar";

const Layout = () => {
  const location = useLocation();

  // ❌ Hide navbar on login page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <NavigationBar />}

      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<PostsList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;