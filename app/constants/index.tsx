import { Bell } from "../icons/bell";
import { CreditCard } from "../icons/credit-card";
import { FileDuoToneBlack } from "../icons/filw-duo-tone-black";
import { Home } from "../icons/home";
import { Settings } from "../icons/settings";
  
  export const MENU_ITEMS = (
    workspaceId: string
  ): { title: string; href: string; icon: React.ReactNode }[] => [
    { title: 'Home', href: `/dashboard/${workspaceId}/home`, icon: <Home /> },
    {
      title: 'My Library',
      href: `/dashboard/${workspaceId}`,
      icon: <FileDuoToneBlack />,
    },
    {
      title: 'Notifications',
      href: `/dashboard/${workspaceId}/notifications`,
      icon: <Bell />,
    },
    {
      title: 'Billing',
      href: `/dashboard/${workspaceId}/billing`,
      icon: <CreditCard />,
    },
    {
      title: 'Settings',
      href: `/dashboard/${workspaceId}/settings`,
      icon: <Settings />,
    },
  ]