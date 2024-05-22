import "react-loading-skeleton/dist/skeleton.css";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { NavigationInfo } from "@/widgets/NavigationInfo";
import { Toaster } from "../providers/toastProvider";
import { AgeDialog } from "@/features/AgeDialog";

export const Layout = () => {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <div className="container">
      {isVerified && (
        <>
          <Header />
          <main className="flex-grow">
            <NavigationInfo />
            <Suspense fallback="Loading...">
              <Outlet />
            </Suspense>
          </main>
          <Toaster />
          <AgeDialog setIsVerified={setIsVerified} />
        </>
      )}
    </div>
  );
};
