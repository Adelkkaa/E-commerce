import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IForbiddenRedirect {
  error: unknown;
  redirectPath: string;
}

export const useForbiddenRedirect = ({
  error,
  redirectPath,
}: IForbiddenRedirect) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (error && (error as any)?.status === 403) {
      navigate(redirectPath);
    }
  }, [error, redirectPath, navigate]);
};
