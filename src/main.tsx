import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/root.tsx";
import AuthLayout from "./components/layouts/auth-layout.tsx";
import Login from "./components/authentication/login.tsx";
import Register from "./components/authentication/register.tsx";
import PostsHome from "./components/posts/post-home.tsx";
import PostDetails from "./components/posts/post-details.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
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
        children: [
          {
            index: true,
            Component: PostsHome,
          },
          {
            path: "postId",
            Component: PostDetails,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
