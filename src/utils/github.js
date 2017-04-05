import parse from 'parse-github-url';

export function parseGithubUrl(url) {
  const { owner, name } = parse(url);
  return {
    user: owner,
    repo: name,
  };
}
