import { SidebarItem } from "./sidebar-item";
import { Icons } from "./icons";

const routes = [
  {
    icon: Icons.home,
    label: "Trang chủ",
    href: "/",
  },
  {
    icon: Icons.disc2,
    label: "Xổ số",
    href: "/",
  },
  {
    icon: Icons.dribbble,
    label: "Thể thao",
    href: "/",
  },
  {
    icon: Icons.dice2,
    label: "Live Casino",
    href: "/",
  },
  {
    icon: Icons.album,
    label: "Nổ hũ",
    href: "/",
  },
  {
    icon: Icons.fish,
    label: "Bắn cá",
    href: "/",
  },
  {
    icon: Icons.gamepad,
    label: "E-Sports",
    href: "/",
  },
  {
    icon: Icons.ticket,
    label: "Ưu đãi",
    href: "/",
  },
  {
    icon: Icons.userCog,
    label: "Đại lí",
    href: "/",
  },
  {
    icon: Icons.book,
    label: "Hỗ trợ",
    href: "/",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
