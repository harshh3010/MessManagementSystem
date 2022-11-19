import { all, call, put, takeEvery } from "redux-saga/effects";
import { STUDENT_ACTIONS } from "./constants";
import {
  setAddStudentResponseStatus,
  setAssignRoleResponseStatus,
  setError,
  setLoadStudentsResponseStatus,
  setStudents,
  updateRole,
  updateStudents,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import {
  addStudentRequest,
  assignRoleRequest,
  loadStudentsRequest,
} from "./services";

/**
 * Function to load students belonging to specified mess in the store
 */
function* loadStudents(action) {
  try {
    const { messId } = action.payload;
    yield put(setLoadStudentsResponseStatus(RESPONSE_STATUS.PENDING));
    const response = yield call(loadStudentsRequest, messId);
    yield put(setStudents(messId, response.data));
    yield put(setLoadStudentsResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to load students!"));
    yield put(setLoadStudentsResponseStatus(RESPONSE_STATUS.FAILED));
  }
}

/**
 * This function adds a new student in specified mess
 */
function* addStudent(action) {
  try {
    const { messId, student } = action.payload;
    yield put(setAddStudentResponseStatus(RESPONSE_STATUS.PENDING));
    const response = yield call(addStudentRequest, messId, student);
    yield put(updateStudents(messId, [response.data]));
    yield put(setAddStudentResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to add new student in the mess!"));
    yield put(setAddStudentResponseStatus(RESPONSE_STATUS.FAILED));
  }
}

/**
 * This function updates the role of a student in the mess
 */
function* assignRole(action) {
  try {
    const { messId, userId, role } = action.payload;
    yield put(setAssignRoleResponseStatus(RESPONSE_STATUS.PENDING));
    yield call(assignRoleRequest, messId, userId, role);
    yield put(updateRole(messId, userId, role));
    yield put(setAssignRoleResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to assign the role!"));
    yield put(setAssignRoleResponseStatus(RESPONSE_STATUS.FAILED));
  }
}

export default function* studentSaga() {
  yield all([
    yield takeEvery(STUDENT_ACTIONS.LOAD_STUDENTS, loadStudents),
    yield takeEvery(STUDENT_ACTIONS.ADD_STUDENT, addStudent),
    yield takeEvery(STUDENT_ACTIONS.ASSIGN_ROLE, assignRole),
  ]);
}
