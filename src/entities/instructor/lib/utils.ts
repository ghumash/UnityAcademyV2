/**
 * Получает инициалы из полного имени для fallback аватара
 * @param name - полное имя пользователя
 * @returns строка с инициалами (максимум 2 символа)
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Получает название платформы для социальной сети
 * @param platform - ключ платформы
 * @returns локализованное название платформы
 */
export const getPlatformName = (platform: string): string => {
  const platformNames: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    behance: 'Behance',
    github: 'GitHub',
    x: 'X (Twitter)',
    website: 'Веб-сайт'
  };
  
  return platformNames[platform] || platform;
};
