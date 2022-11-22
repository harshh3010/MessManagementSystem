import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import LineChart from "./Charts/LineChart";

const dropdownData = [
  {
    itemId: "1",
    name: "Rice",
  },
  {
    itemId: "2",
    name: "Lemon",
  },
  {
    itemId: "3",
    name: "Sugar",
  },
];

const DropDown = () => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="item"
      fields={{ text: "name", value: "itemId" }}
      style={{ border: "none", color: "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const InventoryOverview = () => {
  return (
    <div className="col-span-3 container p-8 bg-white rounded-lg">
      <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">Inventory Overview</p>
        <DropDown />
      </div>
      <LineChart />
    </div>
  );
};

export default InventoryOverview;
