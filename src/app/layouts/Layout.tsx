import "react-loading-skeleton/dist/skeleton.css";
import { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { AgeDialog } from "@/features/AgeDialog";
import { SharedDialog } from "@/widgets/Dialog";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { NavigationInfo } from "@/widgets/NavigationInfo";
import { Toaster } from "../providers/toastProvider";
import { store } from "../store";

export const Layout = () => {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <Provider store={store}>
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
            <SharedDialog />
            <Footer />
          </>
        )}
      </div>
    </Provider>
  );
};
