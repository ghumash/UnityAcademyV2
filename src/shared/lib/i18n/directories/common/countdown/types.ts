export type CountdownDict = {
  title: string;
  subtitle: string;
  urgentTitle: string;
  urgentSubtitle: string;
  timeUnits: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  messages: {
    almostExpired: string;
    lastChance: string;
    ending: string;
  };
};
