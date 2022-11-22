import { Header } from "../../components/mess";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { useSelector } from "react-redux";
import { loadConsumptions } from "../../store/consumption/actions";
import CustomGrid from "../../components/ui/CustomGrid";

const consumptionGrid = [
  {
    field: "_id",
    width: "0",
    isPrimaryKey: true,
  },
  {
    field: "itemId",
    headerText: "Item Id",
    width: "0",
  },
  {
    field: "name",
    headerText: "Item Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    textAlign: "Center",
    width: "120",
  },
  {
    field: "description",
    headerText: "Description",
    textAlign: "Center",
    width: "250",
  },
  {
    field: "date",
    headerText: "Date",
    width: "150",
    format: "yMd",
    textAlign: "Center",
  },
];

const Consumption = (props) => {
  const loadConsumptionsResponseStatus = useSelector(
    (state) =>
      state?.consumption?.messIdToStatusMap?.[props.messId]?.loadConsumptions
  );
  const inventory = useSelector(
    (state) => state?.inventory?.messIdToInventoryMap?.[props.messId]
  );
  // TODO: Save a map in store along with array of items
  const getItemNameFromId = (itemId) => {
    var itemName;
    inventory?.forEach((item) => {
      if (item._id === itemId) itemName = item.name;
    });
    return itemName;
  };
  const consumptions = useSelector(
    (state) => state?.consumption?.messIdToConsumptionsMap?.[props.messId]
  )?.map((consumption) => ({
    ...consumption,
    date: new Date(consumption.date),
    name: getItemNameFromId(consumption.item),
    itemId: consumption.item,
  }));

  return (
    <AsyncLoader
      responseStatus={loadConsumptionsResponseStatus}
      action={loadConsumptions(props.messId)}>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Consumption" />
        <CustomGrid
          dataSource={consumptions}
          grid={consumptionGrid}
          allowedColumnsForAdd={["itemId", "quantity", "description", "date"]}
          allowedColumnsForEdit={["quantity", "description", "date"]}
          onItemAdded={(item) => console.log("Added", item)}
          onItemUpdated={(item) => console.log("Updated", item)}
          onItemDeleted={(item) => console.log("Deleted", item)}
        />
      </div>
    </AsyncLoader>
  );
};
export default Consumption;
