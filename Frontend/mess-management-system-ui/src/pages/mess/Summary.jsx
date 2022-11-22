import InventoryOverview from "../../components/mess/InventoryOverview";
import ExpensesOverview from "../../components/mess/ExpensesOverview";
import RecentExpenses from "../../components/mess/RecentExpenses";
import RecentConsumption from "../../components/mess/RecentConsumption";
import ConsumptionOverview from "../../components/mess/ConsumptionOverview";

const Summary = () => {
  return (
    <div className="mt-24">
      <div className="container mx-auto px-4 ">
        <div className="grid gap-4 grid-cols-3">
          <InventoryOverview />
          <ExpensesOverview />
          <RecentExpenses />
          <RecentConsumption />
          <ConsumptionOverview />
        </div>
      </div>
    </div>
  );
};

export default Summary;
