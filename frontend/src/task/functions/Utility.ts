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

/***
 * 受け取った文字列がブランクやnullでないかどうか検証します
 * @param targetValue
 */
export function isNotBlank(targetValue: string) {
  return (
    targetValue !== "" &&
    targetValue !== "null" &&
    targetValue !== null &&
    targetValue !== undefined
  );
}
