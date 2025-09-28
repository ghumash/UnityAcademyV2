
export const isEventFull = (current?: number, max?: number): boolean => {
  if (!current || !max) return false;
  return current >= max;
};

export const getRegistrationProgress = (current?: number, max?: number): number => {
  if (!current || !max) return 0;
  return Math.round((current / max) * 100);
};

export const calculateDaysUntilEvent = (eventDateStr: string): { daysUntilEvent: number; isUpcoming: boolean } => {
  const today = new Date();
  const eventDate = new Date(eventDateStr);
  const diffTime = eventDate.getTime() - today.getTime();
  const daysUntilEvent = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const isUpcoming = daysUntilEvent > 0;
  
  return { daysUntilEvent, isUpcoming };
};
