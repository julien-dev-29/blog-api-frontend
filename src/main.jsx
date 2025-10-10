import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import "./index.css";
import Root from "./root.jsx";
import Home from "./components/home.jsx";
import AuthLayout from "./components/authentication/authLayout.jsx";
import Login from "./components/authentication/login.jsx";
import Register from "./components/authentication/register.jsx";
import PostsHome from "./components/posts/posts-home.jsx";
import PostsDetails from "./components/posts/posts-details.jsx";
import { StrictMode } from "react";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        path: "posts",
        middleware: [authMiddleware],
        children: [
          { index: true, Component: PostsHome },
          { path: ":postId", Component: PostsDetails },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
