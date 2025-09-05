export type ContactsSectionDict = {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
};

export type MapSectionDict = {
  title: string;
  description: string;
};

export type FormSectionDict = {
  title: string;
  description: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  button: string;
  success: string;
  error: string;
};

export type ContactDict = {
  contactsSection: ContactsSectionDict;
  mapSection: MapSectionDict;
  formSection: FormSectionDict;
};
