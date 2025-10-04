/**
 * Utility formatters / Köməkçi formatlaşdırıcılar
 */

/**
 * Format duration in seconds to MM:SS
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format phone number to display format
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format: +994 XX XXX XX XX
  if (cleaned.startsWith('994')) {
    const code = cleaned.slice(0, 3);
    const part1 = cleaned.slice(3, 5);
    const part2 = cleaned.slice(5, 8);
    const part3 = cleaned.slice(8, 10);
    const part4 = cleaned.slice(10, 12);
    return `+${code} ${part1} ${part2} ${part3} ${part4}`;
  }
  
  return phone;
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'İndi';
  } else if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} dəqiqə əvvəl`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} saat əvvəl`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} gün əvvəl`;
  }
};

/**
 * Format percentage with symbol
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Format file size (bytes to KB/MB)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }
};
