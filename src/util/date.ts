export const formatDate = (date: Date) =>
  date.toLocaleDateString('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const formatMonth = (date: Date) =>
  date.toLocaleDateString('he-IL', {
    month: 'long',
    year: 'numeric',
  });
