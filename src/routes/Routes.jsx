import { createBrowserRouter } from "react-router-dom";
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
        element: <IdeaDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/ideas/${params.id}`),
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
