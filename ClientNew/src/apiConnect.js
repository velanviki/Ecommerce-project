import axios from "axios";

const BASE_URL = "http://localhost:4000/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWQxMGE1ZDA3NmVjYjM4OWE5NWI5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDM2OTYyNywiZXhwIjoxNjUwNjI4ODI3fQ.ysnOvsOgss-iR9KDAygqOzQgz1SF_4DueWC_QfOQMi8"



// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});