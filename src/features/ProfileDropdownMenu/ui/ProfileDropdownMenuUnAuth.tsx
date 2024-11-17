import { dialogActions } from "@/entities/Dialog";
import ProfileIcon from "@/shared/assets/images/Profile.svg";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from "@/shared/ui";

export const ProfileDropdownMenuUnAuth = () => {
  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent hover:strokeBlue w-[36px] h-[36px] p-2 outline-none">
        <ProfileIcon className="cursor-pointer w-full h-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[260px]">
        <DropdownMenuItem
          onClick={() => dispatch(selectCurrentDialog("login"))}
        >
          <Button variant="ghost" className="text-textM w-full text-center">
            Войти
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-center">
          <Typography variant="textXXS" className="text-center">
            Нет аккаунта?
          </Typography>
          <DropdownMenuItem
            onClick={() => dispatch(selectCurrentDialog("contact"))}
            className="!text-textXXS text-center text-blueCustom p-0 pl-[2px] underline cursor-pointer focus:bg-transparent focus:text-blueCustom"
          >
            Оставьте контакты
          </DropdownMenuItem>
          <Typography variant="textXXS" className="text-center">
            , чтобы мы связались с Вами
          </Typography>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
