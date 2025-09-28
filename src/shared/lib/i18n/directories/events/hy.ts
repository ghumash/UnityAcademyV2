import type { EventsDict } from "./types";
import { eventsSection } from "./general/eventsSection/hy";
import { graphic_design_open_class } from "./list/graphic_design_open_class/hy";
import { single } from "./single/hy";

export const events: EventsDict = {
  general: {
    eventsSection,
  },
  list: {
    graphic_design_open_class,
  },
  single,
};
