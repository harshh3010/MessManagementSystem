import {
  getRequest,
  getUrlWithParamsReplaced,
  postRequest,
} from "../../utilities/networkUtils";
import { STUDENT_API } from "./constants";

/**
 * Function to send an add student request to the server
 */
export const addStudentRequest = async (messId, student) => {
  return await postRequest(
    getUrlWithParamsReplaced(STUDENT_API.ADD_STUDENT, { mess_id: messId }),
    { ...student }
  );
};

/**
 * Function to send load all students request to the server
 */
export const loadStudentsRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(STUDENT_API.GET_STUDENTS, { mess_id: messId })
  );
};

/**
 * Function to send assign roles request to the server
 */
export const assignRoleRequest = async (messId, userId, role) => {
  return await postRequest(
    getUrlWithParamsReplaced(STUDENT_API.ASSIGN_ROLE, { mess_id: messId }),
    { userId, role }
  );
};
