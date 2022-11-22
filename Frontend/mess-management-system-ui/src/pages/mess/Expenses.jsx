import { Header } from "../../components/mess";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { useSelector } from "react-redux";
import { loadExpenses } from "../../store/expense/actions";
import CustomGrid from "../../components/ui/CustomGrid";

const expensesGrid = [
  {
    field: "_id",
    width: "0",
    isPrimaryKey: true,
  },
  {
    field: "itemId",
    // TODO: Replce id selection with dropdown
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
    field: "amount",
    headerText: "Amount",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "seller",
    headerText: "Seller",
    width: "150",
    textAlign: "Center",
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

const Expenses = (props) => {
  const loadExpensesResponseStatus = useSelector(
    (state) => state?.expense?.messIdToStatusMap?.[props.messId]?.loadExpenses
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
  const expenses = useSelector(
    (state) => state?.expense?.messIdToExpensesMap?.[props.messId]
  )?.map((expense) => ({
    ...expense,
    date: new Date(expense.date),
    name: getItemNameFromId(expense.item),
    itemId: expense.item,
  }));

  return (
    <AsyncLoader
      responseStatus={loadExpensesResponseStatus}
      action={loadExpenses(props.messId)}>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Expenses" />
        <CustomGrid
          dataSource={expenses}
          grid={expensesGrid}
          allowedColumnsForEdit={[
            "amount",
            "quantity",
            "description",
            "seller",
            "date",
          ]}
          allowedColumnsForAdd={[
            "itemId",
            "amount",
            "quantity",
            "description",
            "seller",
            "date",
          ]}
          onItemAdded={(item) => console.log("Added", item)}
          onItemUpdated={(item) => console.log("Updated", item)}
          onItemDeleted={(item) => console.log("Deleted", item)}
        />
      </div>
    </AsyncLoader>
  );
};
export default Expenses;
