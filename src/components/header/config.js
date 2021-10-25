import axios from 'axios';

// const baseURL = 'http://192.168.0.106:8000/api/';

const client = axios.create({
  baseURL: 'http://192.168.0.106:8000/api/',
  json: true,
  header: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
  }
});


export default {
  getMethod(uri) {
    return client.get(uri);
  },
  postMethod(uri,data) {
    return client.post(uri,data);
  },
  putMethod(uri) {
    return client.put(uri);
  },
  deleteMethod(uri) {
    return client.delete(uri);
  }
};
