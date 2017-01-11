import axios from 'axios';

export function fetch() {
  return axios.get('https://ant-design.github.io/scaffold-market/list.json');
}
