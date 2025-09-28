export type Event = {
  id: string;
  title: string;
  description: string;
  date?: {
    month: string;
    day: string;
    time: string;
  }; // Опциональная дата
  duration: string; // e.g. "2 часа"
  type: string;
  /** React icon component to render on the card header */
  icon?: React.ReactNode;
  /** optional link to event page */
  href?: string;
  /** registration required */
  requiresRegistration?: boolean;
  /** max participants */
  maxParticipants?: number;
  /** current registered participants */
  currentParticipants?: number;
};

export interface EventsProps {
  title: string;
  soon: string; // Локализованное "скоро"
  list: readonly Event[];
  cardLabels: {
    completed: string;
    full: string;
    registration_open: string;
    participants_label: string;
    details: string;
    learn_more: string;
  };
}

export interface EventCardProps {
  event: Event;
  soon: string;
  cardLabels: EventsProps["cardLabels"];
}
