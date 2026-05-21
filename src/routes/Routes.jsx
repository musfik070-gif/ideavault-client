import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Ideas from "../pages/Ideas";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AddIdea from "../pages/AddIdea";
import MyIdeas from "../pages/MyIdeas";
import MyInteractions from "../pages/MyInteractions";
import IdeaDetails from "../pages/IdeaDetails";
import UpdateIdea from "../pages/UpdateIdea";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/ideas",
        element: <Ideas />,
      },
      {
        path: "/ideas/:id",
        element: (
          <PrivateRoute>
            <IdeaDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          const token = localStorage.getItem("token");
          if (!token) {
            return redirect(`/login?redirect=${encodeURIComponent(`/ideas/${params.id}`)}`);
          }
          const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
          return fetch(`${apiBase}/ideas/${params.id}`);
        },
      },
      {
        path: "/add-idea",
        element: (
          <PrivateRoute>
            <AddIdea />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ideas",
        element: (
          <PrivateRoute>
            <MyIdeas />
          </PrivateRoute>
        ),
        loader: async () => {
          const token = localStorage.getItem("token");
          if (!token) {
            return redirect("/login?redirect=/my-ideas");
          }
          const storedUser = JSON.parse(localStorage.getItem("user"));
          const email = storedUser?.email;

          if (!email) return [];

          const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
          const response = await fetch(
            `${apiBase}/my-ideas`,
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          );
          return response.json();
        },
      },
      {
        path: "/my-interactions",
        element: (
          <PrivateRoute>
            <MyInteractions />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
