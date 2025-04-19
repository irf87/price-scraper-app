export const getDomain = (url?: string) => {
  if (!url) {
    return '';
  }
  const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
  const match = regex.exec(url);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
};
