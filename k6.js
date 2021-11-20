import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
export const options = {
  vus: 5000,
  duration: '30s',
};
export default function () {
  http.get(`http://ec2-3-91-65-150.compute-1.amazonaws.com/${randomIntBetween(10000, 99999)}/`);
  sleep(1);
}
