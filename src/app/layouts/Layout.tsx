import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { Suspense, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { AgeDialog } from "@/features/AgeDialog";
import { SharedDialog } from "@/widgets/Dialog";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { NavigationInfo } from "@/widgets/NavigationInfo";
import { Toaster } from "../providers/toastProvider";
import { store } from "../store";

// Регистрация русской локализации
registerLocale("ru", ru);

// Установка русской локализации как текущей
setDefaultLocale("ru");

export const Layout = () => {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <main className="flex-grow">
          <NavigationInfo />
          <Suspense fallback="Loading...">
            <Outlet />
          </Suspense>
        </main>
        <Toaster />
        <AgeDialog isVerified={isVerified} setIsVerified={setIsVerified} />
        <SharedDialog />
        <Footer />
      </div>
    </Provider>
  );
};
