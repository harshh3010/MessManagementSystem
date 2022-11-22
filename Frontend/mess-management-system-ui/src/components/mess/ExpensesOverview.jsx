import PieChart from "./Charts/Pie";

const ExpensesOverview = () => {
  return (
    <div className="col-span-2 container p-8 bg-white rounded-lg">
      <p className="text-xl font-semibold">Expenses Overview</p>
      <div className="grid gap-2 grid-cols-4">
        <div className="col-span-1 p-1 flex flex-col justify-center align-center mx-auto">
          <p className="text-xl font-semibold">Total Expense</p>
          <p className="text-4xl font-semibold">₹48004.50</p>
        </div>
        <div className="col-span-3 p-1">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default ExpensesOverview;
