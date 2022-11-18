import axios from "axios";
import { fetchAuthToken } from "./storageUtils";

/**
 * Function to send a post request to a url
 */
export const postRequest = async (url, data, applyAuthHeaders = true) => {
  var headers = {};
  if (applyAuthHeaders) {
    const token = fetchAuthToken();
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await axios({
    method: "post",
    url: url,
    data: data,
    headers: headers,
  });
  return response.data;
};

/**
 * Function to send a get request to a url
 */
export const getRequest = async (url, applyAuthHeaders = true) => {
  var headers = {};
  if (applyAuthHeaders) {
    const token = fetchAuthToken();
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await axios({
    method: "get",
    url: url,
    headers: headers,
  });
  return response.data;
};
