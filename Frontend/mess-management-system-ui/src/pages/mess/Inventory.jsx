import { Header } from "../../components/mess";
import { useDispatch, useSelector } from "react-redux";
import AsyncLoader from "../../components/ui/AsyncLoader";
import {
  addItem,
  loadItems,
  setAddItemResponseStatus,
} from "../../store/inventory/actions";
import CustomGrid from "../../components/ui/CustomGrid";
import AsyncResponseToast from "../../components/ui/AsyncResponseToast";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { RESPONSE_STATUS } from "../../store/commons/constants";

const gridInventoryQuantity = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p>
      {props.quantity} {props.unit}
    </p>
  </div>
);

export const inventoryGrid = [
  {
    field: "_id",
    width: "0",
    isPrimaryKey: true,
  },
  {
    field: "mess",
    width: "0",
  },
  {
    field: "name",
    headerText: "Item Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "nameSlug",
    width: "0",
  },
  {
    field: "brand",
    headerText: "Brand",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "description",
    headerText: "Description",
    width: "250",
    textAlign: "Center",
  },
  {
    field: "quantity",
    headerText: "Quantity",
    width: "0",
    editType: "numericedit",
  },
  {
    field: "unit",
    headerText: "Unit",
    width: "0",
    editType: "dropdownedit",
    edit: {
      params: {
        actionComplete: () => false,
        allowFiltering: true,
        dataSource: new DataManager([
          { unitName: "Grams (g)", unitId: "g" },
          { unitName: "Kilograms (Kg)", unitId: "kg" },
          { unitName: "Mililitres (ml)", unitId: "ml" },
          { unitName: "Litres (l)", unitId: "l" },
        ]),
        fields: { text: "unitName", value: "unitId" },
        query: new Query(),
      },
    },
  },
  {
    headerText: "Quantity",
    width: "100",
    textAlign: "Center",
    template: gridInventoryQuantity,
  },
];

const Inventory = (props) => {
  const loadItemsResponseStatus = useSelector(
    (state) => state?.inventory?.messIdToStatusMap?.[props.messId]?.loadItems
  );
  const addItemResponseStatus = useSelector(
    (state) => state?.inventory?.messIdToStatusMap?.[props.messId]?.addItem
  );
  const inventory = useSelector(
    (state) => state?.inventory?.messIdToInventoryMap?.[props.messId]
  );
  const dispatch = useDispatch();

  return (
    <AsyncLoader
      responseStatus={loadItemsResponseStatus}
      action={loadItems(props.messId)}>
      <AsyncResponseToast
        responseStatus={addItemResponseStatus}
        successMessage="Item added successfully!"
        failureMessage="Unable to add a new item!"
        action={setAddItemResponseStatus(props.messId, RESPONSE_STATUS.NONE)}
      />
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Inventory" />
        <CustomGrid
          dataSource={inventory}
          grid={inventoryGrid}
          allowedColumnsForEdit={["name", "brand", "description"]}
          allowedColumnsForAdd={["name", "brand", "description", "unit"]}
          onItemAdded={(item) => dispatch(addItem(props.messId, item))}
          onItemUpdated={(item) => console.log("Updated", item)}
          onItemDeleted={(item) => console.log("Deleted", item)}
        />
      </div>
    </AsyncLoader>
  );
};

export default Inventory;
