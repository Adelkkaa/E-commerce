export const headerLinks = [
  {
    title: "Главная",
    href: "/",
    searchBreadcrumb: "/",
    description: "Каталог",
  },
  {
    title: "О Нас",
    href: "/about",
    searchBreadcrumb: "/about",
    description: "О Нас",
  },
  {
    title: "Контакты",
    href: "/contacts",
    searchBreadcrumb: "/contacts",
    description: "Контакты",
  },
];

export const allLinks = [
  ...headerLinks,
  {
    title: "Корзина",
    href: "/cart",
    searchBreadcrumb: "/cart",
    description: "Корзина",
  },
  {
    title: "Информация о товаре",
    href: "/product/:productId",
    searchBreadcrumb: "productId",
    description: "Информация о товаре",
  },
];

export const redirectLinks = ["/product"];
