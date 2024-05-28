import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Typography } from "@/shared/ui";
import { Layout } from "../layouts/Layout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Cart = lazy(() => import("@/pages/Cart"));
const Product = lazy(() => import("@/pages/Product"));
const Agreeement = lazy(() => import("@/pages/Agreement"));
const Policy = lazy(() => import("@/pages/Policy"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const Orders = lazy(() => import("@/pages/Orders"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/contacts",
    element: <Cart />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
  },
  {
    path: "/agreement",
    element: <Agreeement />,
  },
  {
    path: "/policy",
    element: <Policy />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "*",
    element: <Typography variant="h1">404</Typography>,
  },
];

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);
