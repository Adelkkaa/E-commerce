import { lazy } from "react";
import { createBrowserRouter, Link, RouteObject } from "react-router-dom";
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
const OrderInfo = lazy(() => import("@/pages/OrderInfo"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/about",
        element: <About />,
        handle: {
          crumb: () => <Link to="/about">О Нас</Link>,
        },
      },
      {
        path: "/cart",
        element: <Cart />,
        handle: {
          crumb: () => <Typography variant="buttonM">Корзина</Typography>,
        },
      },
      {
        path: "/contacts",
        element: <Cart />,
        handle: {
          crumb: () => <Typography variant="buttonM">Контакты</Typography>,
        },
      },
      {
        path: "/product/:productId",
        element: <Product />,
        handle: {
          crumb: () => (
            <Typography variant="buttonM">Информация о товаре</Typography>
          ),
        },
      },
      {
        path: "/agreement",
        element: <Agreeement />,
        handle: {
          crumb: () => (
            <Typography variant="buttonM">
              Согласие на обработку персональных данных
            </Typography>
          ),
        },
      },
      {
        path: "/policy",
        element: <Policy />,
        handle: {
          crumb: () => (
            <Typography variant="buttonM">
              Политика конфиденциальности
            </Typography>
          ),
        },
      },
      {
        path: "/favorites",
        element: <Favorites />,
        handle: {
          crumb: () => <Typography variant="buttonM">Избранное</Typography>,
        },
      },
      {
        path: "/orders",
        element: <Orders />,
        handle: {
          crumb: () => <Link to="/orders">Мои заказы</Link>,
        },
        children: [
          {
            path: "/orders/:orderId",
            element: <OrderInfo />,
            handle: {
              crumb: () => <Typography variant="buttonM">Заказ</Typography>,
            },
          },
        ],
      },
    ],
    handle: {
      crumb: () => <Link to="/">Домой</Link>,
    },
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
