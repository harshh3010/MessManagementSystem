import { useSelector } from "react-redux";
import PieChart from "./Charts/Pie";

const ExpensesOverview = (props) => {
  const expensesOverviewData = useSelector(
    (state) =>
      state?.reporting?.messIdToReportingDataMap?.[props.messId]
        ?.expensesOverviewData
  );

  return (
    <div className="col-span-2 container p-8 bg-white rounded-lg">
      <p className="text-xl font-semibold">Expenses Overview</p>
      <div className="grid gap-2 grid-cols-4">
        <div className="col-span-1 p-1 flex flex-col justify-center align-center mx-auto">
          <p className="text-xl font-semibold">Total Expense</p>
          <p className="text-4xl font-semibold">
            ₹{expensesOverviewData?.totalExpenses}
          </p>
        </div>
        <div className="col-span-3 p-1">
          <PieChart data={expensesOverviewData?.data} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesOverview;
