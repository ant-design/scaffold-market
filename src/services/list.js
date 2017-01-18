import axios from 'axios';

export function fetch() {
  return axios.get('http://scaffold.ant.design/list.json');
}
