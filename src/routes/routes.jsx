import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Layout from "../layouts/Layout";
import SingleCourse from "../pages/SingleCourse";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import UserProfile from "../pages/UserProfile";
import { ProtectedRoute } from "./ProtectedRoutes";
import { LoggedRoutes } from "./LoggedRoutes";
import { NotLoggedRoutes } from "./NotLoggedRoutes";
import UserCourses from "../pages/UserCourses";
import UserCreateCourse from "../pages/UserCreateCourse";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "login",
            element: (
              <NotLoggedRoutes>
                <Login />
              </NotLoggedRoutes>
            ),
          },
          {
            path: "signin",
            element: <Signin />,
          },
          {
            path: "admin",
            element: (
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses",
            children: [
              {
                path: "",
                element: <Courses />,
              },
              {
                path: "course",
                element: <SingleCourse />,
              },
              {
                path: "user",
                element: (
                  <LoggedRoutes>
                    <UserCourses />
                  </LoggedRoutes>
                ),
              },
              {
                path: "create",
                element: (
                  <LoggedRoutes>
                    <UserCreateCourse />
                  </LoggedRoutes>
                ),
              },
            ],
          },
          {
            path: "profile",
            element: (
              <LoggedRoutes>
                <UserProfile />
              </LoggedRoutes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 not found</h1>,
  },
]);
