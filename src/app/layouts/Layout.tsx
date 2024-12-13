import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { Suspense, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { AgeDialog } from "@/features/AgeDialog";
import { CookieConsent } from "@/features/CookieConsent";
import { Loader } from "@/shared/ui";
import { SharedDialog } from "@/widgets/Dialog";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { NavigationInfo } from "@/widgets/NavigationInfo";
import { Toaster } from "../providers/toastProvider";
import { store } from "../store";
import { AuthLayout } from "./AuthLayout";

// Регистрация русской локализации
registerLocale("ru", ru);

// Установка русской локализации как текущей
setDefaultLocale("ru");

export const Layout = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  return (
    <Provider store={store}>
      <AuthLayout>
        <div className="container">
          <Header />
          <main className="flex-grow">
            <NavigationInfo />
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <Toaster />
          <AgeDialog isVerified={isVerified} setIsVerified={setIsVerified} />
          {isVerified && <CookieConsent />}
          <SharedDialog />
          <Footer />
        </div>
      </AuthLayout>
    </Provider>
  );
};
