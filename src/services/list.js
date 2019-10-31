import axios from 'axios';

export function fetch() {
  return axios.get('https://scaffold.ant.design/list.json');
}

export function fetchReadme(user, repo) {
  return axios.get(`https://get-github-readme-v2.now.sh/${user}/${repo}/?branch=master`);
}
