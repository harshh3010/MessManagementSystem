import InventoryOverview from "../../components/mess/InventoryOverview";
import ExpensesOverview from "../../components/mess/ExpensesOverview";
import RecentExpenses from "../../components/mess/RecentExpenses";
import RecentConsumption from "../../components/mess/RecentConsumption";
import ConsumptionOverview from "../../components/mess/ConsumptionOverview";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { useSelector } from "react-redux";
import { loadReportingData } from "../../store/reporting/actions";
import { loadItems } from "../../store/inventory/actions";

const Summary = (props) => {
  const loadReportingDataResponseStatus = useSelector(
    (state) =>
      state?.reporting?.messIdToStatusMap?.[props.messId]?.loadReportingData
  );
  const loadInventoryResponseStatus = useSelector(
    (state) => state?.inventory?.messIdToStatusMap?.[props.messId]?.loadItems
  );

  return (
    <AsyncLoader
      responseStatus={loadInventoryResponseStatus}
      action={loadItems(props.messId)}>
      <AsyncLoader
        responseStatus={loadReportingDataResponseStatus}
        action={loadReportingData(props.messId)}>
        <div className="mt-24">
          <div className="container mx-auto px-4 ">
            <div className="grid gap-4 grid-cols-3">
              <InventoryOverview messId={props.messId} />
              <ExpensesOverview messId={props.messId} />
              <RecentExpenses messId={props.messId} />
              <RecentConsumption messId={props.messId} />
              <ConsumptionOverview messId={props.messId} />
            </div>
          </div>
        </div>
      </AsyncLoader>
    </AsyncLoader>
  );
};

export default Summary;
