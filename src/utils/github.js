
const regex = /https?:\/\/(www\.)?github\.com\/([\w-]+)\/([\w-]+)/g;

export function parseGithubUrl(url) {
  const result = regex.exec(url);
  if (!result) {
    return {
      user: null,
      repo: null,
    };
  }
  return {
    user: result[2],
    repo: result[3],
  };
}
