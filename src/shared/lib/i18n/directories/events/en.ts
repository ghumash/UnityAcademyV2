import type { EventsDict } from "./types";
import { eventsSection } from "./general/eventsSection/en";
import { graphic_design_open_class } from "./list/graphic_design_open_class/en";
import { single } from "./single/en";

export const events: EventsDict = {
  general: {
    eventsSection,
  },
  list: {
    graphic_design_open_class,
  },
  single,
};
