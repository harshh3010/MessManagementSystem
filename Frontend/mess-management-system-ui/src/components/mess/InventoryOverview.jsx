import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomDropDown from "../ui/CustomDropDown";
import LineChart from "./Charts/LineChart";

const InventoryOverview = (props) => {
  const inventoryOverviewData = useSelector(
    (state) =>
      state?.reporting?.messIdToReportingDataMap?.[props.messId]
        ?.inventoryOverviewData
  );

  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (inventoryOverviewData) {
      const items = Object.keys(inventoryOverviewData);
      setItemData(items);
      if (items.length > 0) {
        setSelectedItem(items[0]);
      }
    }
  }, [inventoryOverviewData]);

  return (
    <div className="col-span-3 container p-8 bg-white rounded-lg">
      <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">Inventory Overview</p>
        <CustomDropDown
          selectedValue={selectedItem}
          onValueChanged={(value) => setSelectedItem(value)}
          data={itemData}
        />
      </div>
      <LineChart
        purchasedData={inventoryOverviewData?.[selectedItem]?.purchased}
        consumedData={inventoryOverviewData?.[selectedItem]?.consumed}
      />
    </div>
  );
};

export default InventoryOverview;
