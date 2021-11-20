import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1000,
  duration: '30s',
};
export default function () {
  http.get('http://ec2-3-91-65-150.compute-1.amazonaws.com/47421/');
  sleep(1);
}
