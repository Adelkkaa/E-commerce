import { FC, PropsWithChildren, useEffect } from "react";
import { outletsActions } from "@/entities/Outlets";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const { _init } = useAppSelector((state) => state.outletsReducer);
  const dispatch = useAppDispatch();

  const { initOutlets } = outletsActions;

  useEffect(() => {
    if (!_init) {
      dispatch(initOutlets());
    }
  }, [_init]);

  return children;
};
