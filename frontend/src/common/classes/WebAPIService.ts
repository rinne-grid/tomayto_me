import { factoryAxios } from "../../task/functions/Utility";

export default class WebAPIService {
  protected axios;

  public constructor() {
    this.axios = factoryAxios();
  }
}
