import axios from "axios";
export function factoryAxios() {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  return axios;
}
