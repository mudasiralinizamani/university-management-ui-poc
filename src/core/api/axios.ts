  import axios, { AxiosInstance } from "axios";

  const instance: AxiosInstance = axios.create({
    baseURL: "https://pure-gorge-14177.herokuapp.com/",
  });

  export default instance;
