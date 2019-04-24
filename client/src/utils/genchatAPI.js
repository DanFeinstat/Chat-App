import axios from "axios";
export default {
  addComment: (authToken, userData) => {
    return axios.post("/api/ffa/", userData, {
      headers: { "x-access-token": authToken },
    });
  },
  getComments: authToken => {
    return axios.get("/api/ffa/", {
      headers: { "x-access-token": authToken },
    });
  },
};
