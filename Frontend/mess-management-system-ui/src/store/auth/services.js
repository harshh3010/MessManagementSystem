import { getRequest, postRequest } from "../../utilities/networkUtils";
import { AUTH_API } from "./constants";

/**
 * Function to send a login request to the server
 */
export const loginRequest = async (email, password) => {
  return await postRequest(AUTH_API.LOGIN, { email, password }, false);
};

/**
 * Function to send a signup request to the server
 */
export const signupRequest = async (name, email, password) => {
  return await postRequest(AUTH_API.SIGNUP, { name, email, password }, false);
};

/**
 * Function to fetch the logged in user's details from the sever
 */
export const loadUserInfoRequest = async () => {
  return await getRequest(AUTH_API.LOAD_USER_INFO);
};
