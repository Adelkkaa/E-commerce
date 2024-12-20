import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/entities/LoginForm";
import ProfileIcon from "@/shared/assets/images/Profile.svg";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import {
  dialogActions,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from "@/shared/ui";

export const ProfileDropdownMenuAuth = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectCurrentDialog } = dialogActions;
  const { name } = useAppSelector((state) => state.outletsReducer);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      toast({
        title: "Произошла ошибка",
        description: "Попробуйте еще раз",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent hover:strokeMain w-[36px] h-[36px] p-2 outline-none">
        <ProfileIcon className="cursor-pointer w-full h-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[260px]">
        <DropdownMenuItem className="flex flex-col gap-[10px]" disabled>
          <Typography className="font-semibold text-grayCustom" variant="textS">
            Торговая точка
          </Typography>
          <Typography
            className="text-center text-blueCustom"
            variant="tableText"
          >
            {name}
          </Typography>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex flex-col"
          onClick={() => dispatch(selectCurrentDialog("outlets"))}
        >
          <Typography className="text-center" variant="textM">
            Торговые точки
          </Typography>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex flex-col"
          onClick={() => navigate("/orders")}
        >
          <Typography className="text-center" variant="textM">
            Заказы
          </Typography>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex flex-col" onClick={handleLogout}>
          <Typography className="text-center" variant="textM">
            Выйти
          </Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
