import axios from "axios";

/***
 * DjangoのXSRFヘッダ・トークン情報を与えたaxiosオブジェクトを返します。
 * @return {axios}
 */
export function factoryAxios() {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  return axios;
}
