import {
  ProfileDropdownMenuAuth,
  ProfileDropdownMenuUnAuth,
} from "@/features/ProfileDropdownMenu";
import { useAppSelector } from "@/shared/hooks/use-redux";

export const ProfileDropdownMenu = () => {
  const { name } = useAppSelector((state) => state.outletsReducer);

  if (name) {
    return <ProfileDropdownMenuAuth />;
  }

  return <ProfileDropdownMenuUnAuth />;
};
