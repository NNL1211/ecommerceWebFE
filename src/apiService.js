import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API + "/api",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    // toast.success(`"${response.data.category.name}" is created`);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    console.log(error.errors)
    let errorMsg = error.error || "";
    // if (error.errors){
    //   let errorMsgMap="";
    //   errorMsg.map((er)=>{
    //      errorMsgMap += er.msg + ": " ;
    //   })
    //   errorMsg = errorMsgMap;
    // }
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default api;
