import { Routes, Route, useMatch } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BlogDetail } from "./components/Blog/Blog";
import Blogs from "./components/Blog/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/User/LoginForm";
import Users from "./components/User/Users";
import Menu from "./Menu";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { UserDetail } from "./components/User/User";
import { setUser } from "./reducers/userReducer";

import { Container } from "@material-ui/core";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <div>
        <Menu />
        <h1>Blogs App</h1>
        <Notification />
        <LoginForm />

        <Routes>
          <Route path="/users/:id" element={<UserDetail user={user} />} />
          <Route path="/blogs/:id" element={<BlogDetail blog={blog} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Blogs />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
