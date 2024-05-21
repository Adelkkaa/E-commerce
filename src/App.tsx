import { RouterProvider } from "react-router-dom";
import { router } from "./app/providers/appRouter";

export const App = () => {
  return <RouterProvider router={router} />;
};
