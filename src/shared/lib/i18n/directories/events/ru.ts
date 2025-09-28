import type { EventsDict } from "./types";
import { eventsSection } from "./general/eventsSection/ru";
import { graphic_design_open_class } from "./list/graphic_design_open_class/ru";
import { single } from "./single/ru";

export const events: EventsDict = {
  general: {
    eventsSection,
  },
  list: {
    graphic_design_open_class,
  },
  single,
};
