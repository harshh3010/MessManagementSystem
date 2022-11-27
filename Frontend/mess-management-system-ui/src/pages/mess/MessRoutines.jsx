import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/mess";
import AddMessRoutineDialog from "../../components/ui/AddMessRoutineDialog";
import AsyncLoader from "../../components/ui/AsyncLoader";
import AsyncResponseToast from "../../components/ui/AsyncResponseToast";
import { useStateContext } from "../../contexts/ContextProvider";
import { RESPONSE_STATUS } from "../../store/commons/constants";
import {
  loadMessRoutines,
  setAddMessRoutineResponseStatus,
} from "../../store/messRoutine/actions";

const MessRoutines = (props) => {
  const loadMessRoutinesResponseStatus = useSelector(
    (state) =>
      state?.messRoutine?.messIdToStatusMap?.[props.messId]?.loadMessRoutines
  );
  const addMessRoutineResponseStatus = useSelector(
    (state) =>
      state?.messRoutine?.messIdToStatusMap?.[props.messId]?.addMessRoutine
  );
  const messRoutines = useSelector(
    (state) => state?.messRoutine?.messIdToRoutinesMap?.[props.messId]
  );
  const [addRoutineDialogVisible, setAddRoutineDialogVisible] = useState(false);
  const { currentColor } = useStateContext();

  return (
    <AsyncLoader
      responseStatus={loadMessRoutinesResponseStatus}
      action={loadMessRoutines(props.messId)}>
      <AsyncResponseToast
        responseStatus={addMessRoutineResponseStatus}
        successMessage="Mess routine added successfully!"
        failureMessage="Unable to add a new mess routine!"
        action={setAddMessRoutineResponseStatus(
          props.messId,
          RESPONSE_STATUS.NONE
        )}
      />
      <AddMessRoutineDialog
        messId={props.messId}
        visible={addRoutineDialogVisible}
        onClose={() => setAddRoutineDialogVisible(false)}
      />
      {props.userRole !== "student" && (
        <div className="px-8 flex flex-row-reverse">
          <Button
            color="white"
            bgColor={currentColor}
            text="Add new mess routine"
            borderRadius="10px"
            onClick={() => {
              setAddRoutineDialogVisible(true);
            }}
          />
        </div>
      )}
      {messRoutines &&
        Object.keys(messRoutines).map((dayOfWeek) => {
          if (
            messRoutines?.[dayOfWeek] &&
            messRoutines?.[dayOfWeek]?.length !== 0
          ) {
            return (
              <div className="container p-8" key={dayOfWeek}>
                <p className="font-bold text-3xl">{dayOfWeek}</p>
                {messRoutines?.[dayOfWeek]?.map((messRoutine) => {
                  return (
                    <div
                      className="container p-4 bg-white my-4 shadow-md flex justify-between align-center rounded-xl"
                      key={messRoutine._id}>
                      <div>
                        <p className="text-xl">{messRoutine.title}</p>
                        <p className="text-md italic">
                          {messRoutine.description}
                        </p>
                      </div>
                      <div>{`${messRoutine.startTime} - ${messRoutine.endTime}`}</div>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
    </AsyncLoader>
  );
};

export default MessRoutines;
