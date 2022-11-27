import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Button from "./Button";

const RecentExpenses = (props) => {
  const { currentColor } = useStateContext();
  const expenses = useSelector(
    (state) =>
      state?.reporting?.messIdToReportingDataMap?.[props.messId]?.recentExpenses
  );

  const navigate = useNavigate();

  return (
    <div className="col-span-1 container p-4 bg-white rounded-lg">
      <div className="container p-4">
        <p className="text-xl font-semibold">Recent Expenses</p>
      </div>

      <div className="flex flex-col">
        <div className="container p-4">
          {expenses?.map((expense, index) => (
            <div key={index} className="flex justify-between mt-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-md font-semibold">{expense.name}</p>
                  <p className="text-sm text-gray-400">{expense.quantity}</p>
                </div>
              </div>
              <p>{`- ${expense.amount}`}</p>
            </div>
          ))}
        </div>
        <div className="container p-4"></div>
        <Button
          color="white"
          bgColor={currentColor}
          text="View All"
          borderRadius="10px"
          width="full"
          onClick={() => navigate(`/${props.messId}/expenses`)}
        />
      </div>
    </div>
  );
};

export default RecentExpenses;
