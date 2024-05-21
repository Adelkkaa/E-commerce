import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";

export const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main className="flex-grow">
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
