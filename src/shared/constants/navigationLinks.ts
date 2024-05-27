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
    title: "Каталог",
    href: "/product/:productId",
    searchBreadcrumb: "productId",
    description: "Информация о товаре",
  },
  {
    title: "Согласие на обработку персональных данных",
    href: "/agreement",
    searchBreadcrumb: "/agreement",
    description: "Согласие на обработку персональных данных",
  },
  {
    title: "Политика конфиденциальности",
    href: "/policy",
    searchBreadcrumb: "/policy",
    description: "Политика конфиденциальности",
  },
  {
    title: "Избранное",
    href: "/favorites",
    searchBreadcrumb: "/favorites",
    description: "Избранное",
  },
];

export const redirectLinks = ["/product"];
