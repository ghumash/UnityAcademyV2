export type ContactTile = {
  title: string;
  description: string;
  action: {
    label: string;
  };
};

export type LongInfoItem = {
  label: string;
  value: string;
};

export type ContactDict = {
  pageTitle: string;
  tiles: readonly ContactTile[];
  longItems: readonly LongInfoItem[];
};
