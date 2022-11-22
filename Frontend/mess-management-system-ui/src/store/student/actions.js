import { STUDENT_ACTIONS } from "./constants";

export const loadStudents = (messId) => {
  return {
    type: STUDENT_ACTIONS.LOAD_STUDENTS,
    payload: {
      messId,
    },
  };
};

export const setLoadStudentsResponseStatus = (messId, status) => {
  return {
    type: STUDENT_ACTIONS.SET_LOAD_STUDENTS_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const setStudents = (messId, students) => {
  return {
    type: STUDENT_ACTIONS.SET_STUDENTS,
    payload: {
      messId,
      students,
    },
  };
};

export const addStudent = (messId, student) => {
  return {
    type: STUDENT_ACTIONS.ADD_STUDENT,
    payload: {
      messId,
      student,
    },
  };
};

export const setAddStudentResponseStatus = (messId, status) => {
  return {
    type: STUDENT_ACTIONS.SET_ADD_STUDENT_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const updateStudents = (messId, newStudents) => {
  return {
    type: STUDENT_ACTIONS.UPDATE_STUDENTS,
    payload: {
      messId,
      newStudents,
    },
  };
};

export const assignRole = (messId, userId, role) => {
  return {
    type: STUDENT_ACTIONS.ASSIGN_ROLE,
    payload: {
      messId,
      userId,
      role,
    },
  };
};

export const setAssignRoleResponseStatus = (messId, status) => {
  return {
    type: STUDENT_ACTIONS.SET_ASSIGN_ROLE_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const updateRole = (messId, userId, role) => {
  return {
    type: STUDENT_ACTIONS.UPDATE_ROLE,
    payload: {
      messId,
      userId,
      role,
    },
  };
};

export const setError = (error) => {
  return {
    type: STUDENT_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
