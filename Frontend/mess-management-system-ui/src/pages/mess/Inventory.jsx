import { Header } from "../../components/mess";
import { useSelector } from "react-redux";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { loadItems } from "../../store/inventory/actions";
import CustomGrid from "../../components/ui/CustomGrid";

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
  },
  {
    field: "unit",
    headerText: "Unit",
    width: "0",
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
  const inventory = useSelector(
    (state) => state?.inventory?.messIdToInventoryMap?.[props.messId]
  );

  return (
    <AsyncLoader
      responseStatus={loadItemsResponseStatus}
      action={loadItems(props.messId)}>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Inventory" />
        <CustomGrid
          dataSource={inventory}
          grid={inventoryGrid}
          allowedColumnsForEdit={["name", "brand", "description", "unit"]}
          allowedColumnsForAdd={["name", "brand", "description", "unit"]}
          onItemAdded={(item) => console.log("Added", item)}
          onItemUpdated={(item) => console.log("Updated", item)}
          onItemDeleted={(item) => console.log("Deleted", item)}
        />
      </div>
    </AsyncLoader>
  );
};

export default Inventory;
