import { RESPONSE_STATUS } from "../commons/constants";
import { STUDENT_ACTIONS } from "./constants";

const initialState = {
  messIdToStudentsMap: {},
  status: {
    loadStudents: RESPONSE_STATUS.NONE,
    addStudent: RESPONSE_STATUS.NONE,
    assignRole: RESPONSE_STATUS.NONE,
  },
  error: null,
};

const studentReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case STUDENT_ACTIONS.SET_LOAD_STUDENTS_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          loadStudents: data.status,
        },
      };
    case STUDENT_ACTIONS.SET_STUDENTS:
      return {
        ...state,
        messIdToStudentsMap: {
          ...state.messIdToStudentsMap,
          [data.messId]: data.students,
        },
      };
    case STUDENT_ACTIONS.SET_ADD_STUDENT_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          addStudent: data.status,
        },
      };
    case STUDENT_ACTIONS.UPDATE_STUDENTS:
      return {
        ...state,
        messIdToStudentsMap: {
          ...state.messIdToStudentsMap,
          [data.messId]: [
            ...state.messIdToStudentsMap[data.messId],
            ...data.newStudents,
          ],
        },
      };
    case STUDENT_ACTIONS.SET_ASSIGN_ROLE_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          assignRole: data.status,
        },
      };
    case STUDENT_ACTIONS.UPDATE_ROLE:
      return {
        ...state,
        messIdToStudentsMap: {
          ...state.messIdToStudentsMap,
          [data.messId]: state.messIdToStudentsMap[data.messId].map(
            (student) => {
              // Update role for matching student
              if (student.user._id === data.userId) {
                return {
                  ...student,
                  role: data.role,
                };
              }
              return student;
            }
          ),
        },
      };
    case STUDENT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default studentReducer;
