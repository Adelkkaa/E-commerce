import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Layout } from "../layouts/Layout";

const Home = lazy(() => import("@/pages/Home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);
