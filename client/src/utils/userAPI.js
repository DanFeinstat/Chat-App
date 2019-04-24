import axios from "axios";
export default {
  signUp: userData => {
    return axios.post(`/api/user/register`, userData);
  },
  logIn: userData => {
    return axios.post(`/api/user/authenticate`, userData);
  },
  updateSocket: userData => {
    return axios.put(`/api/user/socket`, userData);
  },
  getUserList: () => {
    return axios.get(`/api/user/userlist`);
  },
};
