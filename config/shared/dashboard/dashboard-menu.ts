import {
  dashBoardBookMark,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { DashBoardType } from "@/types";

const dashBoardMenu: DashBoardType[] = [
  dashBoardPost,
  dashBoardBookMark,
  dashBoardSettings,
];
export const userDashBoardMenu: DashBoardType[] = [
  dashBoardBookMark,
  dashBoardSettings
];

export default dashBoardMenu;
