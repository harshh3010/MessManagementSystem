import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Button from "./Button";

const RecentConsumption = (props) => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const consumptionData = useSelector(
    (state) =>
      state?.reporting?.messIdToReportingDataMap?.[props.messId]
        ?.recentConsumption
  );

  return (
    <div className="col-span-1 container p-4 bg-white rounded-lg">
      <div className="container p-4">
        <p className="text-xl font-semibold">Recent Consumption</p>
      </div>

      <div className="flex flex-col">
        <div className="container p-4 ">
          {consumptionData?.map((consumption, index) => (
            <div key={index} className="flex justify-between mt-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-md font-semibold">{consumption.name}</p>
                </div>
              </div>
              <p>{`- ${consumption.quantity}`}</p>
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
          onClick={() => navigate(`/${props.messId}/consumption`)}
        />
      </div>
    </div>
  );
};

export default RecentConsumption;
