import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/neo",
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: "fernandezp1.joe21@gmail.com",
    password: "123456"
  }
});

export default instance;