import parse from 'parse-github-repo-url';

export function parseGithubUrl(url) {
  const [user, repo] = parse(url);
  return {
    user,
    repo,
  };
}
