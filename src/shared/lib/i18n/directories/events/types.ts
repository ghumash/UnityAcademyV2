export type EventsDict = {
  general: {
    eventsSection: EventsSectionDict;
  };
  list: {
    graphic_design_open_class: EventPageDict;
  };
  single: SingleEventDict;
};

export interface EventPageDict {
  eventHeroSection: {
    title: string;
    description: string;
    date?: { month: string; day: string; time: string; fullDate: string };
    duration: string;
    type: string;
    formatLabel: string;
    requiresRegistration: boolean;
    registerButtonText: string;
    maxParticipants?: string;
    currentParticipants?: string;
    price?: string;
    originalPrice?: string;
    sale?: string;
  };
  agenda: {
    display: boolean;
    title: string;
    items: Array<{
      time: string;
      title: string;
      description: string;
      speaker?: string;
    }>;
  };
  speakers: {
    display: boolean;
    title: string;
    list: Array<{
      name: string;
      role: string;
      bio: string;
      avatarUrl?: string;
      social?: {
        linkedin?: string;
        github?: string;
        x?: string;
        website?: string;
      };
    }>;
  };
  benefits: {
    title: string;
    list: Array<{ title: string; description: string; icon?: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText?: string;
  };
}

export interface SingleEventDict {
  // UI компоненты переводы
  hero: {
    completed: string;
    full: string;
    registration_open: string;
    duration_label: string;
    participants_label: string;
    discount_label: string;
    days_until: string;
    days_label: string;
    event_completed: string;
    details: string;
    learn_more: string;
    at_time: string;
    register_button: string;
  };
  agenda: {
    subtitle: string;
    completion: string;
    speaker_label: string;
  };
  benefits_component: {
    subtitle: string;
  };
  speakers: {
    subtitle: string;
    contact_label: string;
  };
  card: {
    completed: string;
    full: string;
    registration_open: string;
    participants_label: string;
    details: string;
    learn_more: string;
  };
}

export type EventsSectionDict = {
  title: string;
  soon: string;
  list: Array<{
    title: string;
    description: string;
    date?: {
      month: string;
      day: string;
      time: string;
    };
    duration: string;
    type: string;
  }>;
};
