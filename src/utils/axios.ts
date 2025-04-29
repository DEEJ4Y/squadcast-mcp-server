import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://auth.squadcast.com",
});

export const apiInstance = axios.create({
  baseURL: "https://api.squadcast.com",
  validateStatus(status) {
    return status <= 500;
  },
});
