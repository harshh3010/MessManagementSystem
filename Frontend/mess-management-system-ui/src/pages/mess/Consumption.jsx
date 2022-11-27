import { Header } from "../../components/mess";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  addConsumption,
  loadConsumptions,
  setAddConsumptionResponseStatus,
} from "../../store/consumption/actions";
import CustomGrid from "../../components/ui/CustomGrid";
import AsyncResponseToast from "../../components/ui/AsyncResponseToast";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { RESPONSE_STATUS } from "../../store/commons/constants";
import { loadItems } from "../../store/inventory/actions";

const Consumption = (props) => {
  const loadConsumptionsResponseStatus = useSelector(
    (state) =>
      state?.consumption?.messIdToStatusMap?.[props.messId]?.loadConsumptions
  );
  const addConsumptionsResponseStatus = useSelector(
    (state) =>
      state?.consumption?.messIdToStatusMap?.[props.messId]?.addConsumption
  );
  const loadItemsResponseStatus = useSelector(
    (state) => state?.inventory?.messIdToStatusMap?.[props.messId]?.loadItems
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
      editType: "dropdownedit",
      edit: {
        params: {
          actionComplete: () => false,
          allowFiltering: true,
          dataSource: new DataManager(
            inventory?.map((item) => ({
              itemName: item.name,
              itemId: item._id,
            }))
          ),
          fields: { text: "itemName", value: "itemId" },
          query: new Query(),
        },
      },
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
      editType: "numericedit",
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
      editType: "datepickeredit",
    },
  ];

  const dispatch = useDispatch();

  return (
    <AsyncLoader
      responseStatus={loadItemsResponseStatus}
      action={loadItems(props.messId)}>
      <AsyncLoader
        responseStatus={loadConsumptionsResponseStatus}
        action={loadConsumptions(props.messId)}>
        <AsyncResponseToast
          responseStatus={addConsumptionsResponseStatus}
          successMessage="Added consumption successfully!"
          failureMessage="Unable to add consumption!"
          action={setAddConsumptionResponseStatus(
            props.messId,
            RESPONSE_STATUS.NONE
          )}
        />
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Consumption" />
          <CustomGrid
            dataSource={consumptions}
            grid={consumptionGrid}
            allowedColumnsForAdd={["itemId", "quantity", "description", "date"]}
            allowedColumnsForEdit={["quantity", "description", "date"]}
            onItemAdded={(item) => dispatch(addConsumption(props.messId, item))}
            onItemUpdated={(item) => console.log("Updated", item)}
            onItemDeleted={(item) => console.log("Deleted", item)}
          />
        </div>
      </AsyncLoader>
    </AsyncLoader>
  );
};
export default Consumption;
