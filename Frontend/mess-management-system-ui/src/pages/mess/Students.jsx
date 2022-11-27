import { Header } from "../../components/mess";
import { useDispatch, useSelector } from "react-redux";
import AsyncLoader from "../../components/ui/AsyncLoader";
import {
  addStudent,
  loadStudents,
  setAddStudentResponseStatus,
} from "../../store/student/actions";
import CustomGrid from "../../components/ui/CustomGrid";
import { GrHome, GrUser } from "react-icons/gr";
import AsyncResponseToast from "../../components/ui/AsyncResponseToast";
import { RESPONSE_STATUS } from "../../store/commons/constants";

const gridStudentProfile = (props) => (
  <div className="flex items-center gap-2">
    <GrUser />
    <p>{props.name}</p>
  </div>
);

const gridStudentFeeStatus = (props) => (
  <div
    style={{ background: props.feeStatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md">
    {props.feeStatus}
  </div>
);

const gridStudentRole = (props) => (
  <div
    style={{ background: props.roleBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md">
    {props.role}
  </div>
);

const gridStudentAddress = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrHome />
    <span>{props.address}</span>
  </div>
);

const studentsGrid = [
  {
    field: "_id",
    width: "0",
    isPrimaryKey: true,
  },
  {
    field: "userId",
    headerText: "User Id",
    width: "0",
  },
  {
    field: "mess",
    width: "0",
  },
  {
    field: "name",
    headerText: "Name",
    width: "0",
  },
  {
    headerText: "Name",
    template: gridStudentProfile,
    width: "170",
    textAlign: "Center",
  },
  {
    field: "registrationNumber",
    headerText: "Reg. No.",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "role",
    headerText: "Role",
    width: "0",
  },
  {
    headerText: "Role",
    width: "120",
    textAlign: "Center",
    template: gridStudentRole,
  },
  {
    field: "degree",
    headerText: "Degree",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "semester",
    headerText: "Semester",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "address",
    headerText: "Address",
    width: "0",
  },
  {
    headerText: "Address",
    width: "120",
    textAlign: "Center",
    template: gridStudentAddress,
  },
  {
    field: "feeStatus",
    headerText: "Fee Status",
    width: "0",
  },
  {
    headerText: "Fee Status",
    width: "120",
    textAlign: "Center",
    template: gridStudentFeeStatus,
  },
];

const getRoleBg = (role) => {
  switch (role) {
    case "student":
      return "#FB9678";
    case "mess-president":
      return "#8BE78B";
    case "mess-secretary":
      return "#8BE78B";
    default:
      return "#FB9678";
  }
};

const getFeeStatusBg = (status) => {
  switch (status) {
    case "paid":
      return "#8BE78B";
    case "unpaid":
      return "#FB9678";
    default:
      return "#FB9678";
  }
};

const Students = (props) => {
  const loadStudentsResponseStatus = useSelector(
    (state) => state?.student?.messIdToStatusMap?.[props.messId]?.loadStudents
  );
  const addStudentResponseStatus = useSelector(
    (state) => state?.student?.messIdToStatusMap?.[props.messId]?.addStudent
  );

  const students = useSelector(
    (state) => state?.student?.messIdToStudentsMap?.[props.messId]
  )?.map((student) => {
    return {
      ...student,
      userId: student.user._id,
      name: student.user.name,
      email: student.user.email,
      role: student.user.role,
      roleBg: getRoleBg(student.user.role),
      feeStatusBg: getFeeStatusBg(student.feeStatus),
    };
  });

  const dispatch = useDispatch();

  return (
    <AsyncLoader
      responseStatus={loadStudentsResponseStatus}
      action={loadStudents(props.messId)}>
      <AsyncResponseToast
        responseStatus={addStudentResponseStatus}
        successMessage="Student added successfully!"
        failureMessage="Unable to add a new student!"
        action={setAddStudentResponseStatus(props.messId, RESPONSE_STATUS.NONE)}
      />
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Enrolled Students" />
        <CustomGrid
          dataSource={students}
          grid={studentsGrid}
          allowedColumnsForAdd={[
            "userId",
            "registrationNumber",
            "degree",
            "semester",
            "address",
          ]}
          allowedColumnsForEdit={["role"]}
          onItemAdded={(item) => dispatch(addStudent(props.messId, item))}
          onItemUpdated={(item) => console.log("Updated", item)}
          onItemDeleted={(item) => console.log("Deleted", item)}
        />
      </div>
    </AsyncLoader>
  );
};
export default Students;
