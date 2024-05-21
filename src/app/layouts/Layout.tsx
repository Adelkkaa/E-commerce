import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { NavigationInfo } from "@/widgets/NavigationInfo";

export const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main className="flex-grow">
        <NavigationInfo />
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
