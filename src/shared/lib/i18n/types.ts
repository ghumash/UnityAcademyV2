export type HeaderDict = {
  menu: string;
  nav: { courses: string; about: string; contacts: string; apply: string };
  footer: {
    navigation: string;
    contacts: string;
    madeIn: string;
    rights: string;
  };
};

export type Dict = { header: HeaderDict };
