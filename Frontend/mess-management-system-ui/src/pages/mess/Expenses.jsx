import { Header } from "../../components/mess";
import AsyncLoader from "../../components/ui/AsyncLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  loadExpenses,
  setAddExpenseResponseStatus,
} from "../../store/expense/actions";
import CustomGrid from "../../components/ui/CustomGrid";
import AsyncResponseToast from "../../components/ui/AsyncResponseToast";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { RESPONSE_STATUS } from "../../store/commons/constants";
import { loadItems } from "../../store/inventory/actions";

const Expenses = (props) => {
  const loadExpensesResponseStatus = useSelector(
    (state) => state?.expense?.messIdToStatusMap?.[props.messId]?.loadExpenses
  );
  const addExpenseResponseStatus = useSelector(
    (state) => state?.expense?.messIdToStatusMap?.[props.messId]?.addExpense
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
  const expenses = useSelector(
    (state) => state?.expense?.messIdToExpensesMap?.[props.messId]
  )?.map((expense) => ({
    ...expense,
    date: new Date(expense.date),
    name: getItemNameFromId(expense.item),
    itemId: expense.item,
  }));

  const expensesGrid = [
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
      field: "amount",
      headerText: "Amount",
      width: "150",
      textAlign: "Center",
      editType: "numericedit",
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
      editType: "datepickeredit",
    },
  ];

  const dispatch = useDispatch();

  return (
    <AsyncLoader
      responseStatus={loadItemsResponseStatus}
      action={loadItems(props.messId)}>
      <AsyncLoader
        responseStatus={loadExpensesResponseStatus}
        action={loadExpenses(props.messId)}>
        <AsyncResponseToast
          responseStatus={addExpenseResponseStatus}
          successMessage="Expense added successfully!"
          failureMessage="Unable to add expense!"
          action={setAddExpenseResponseStatus(
            props.messId,
            RESPONSE_STATUS.NONE
          )}
        />
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
            onItemAdded={(item) => dispatch(addExpense(props.messId, item))}
            onItemUpdated={(item) => console.log("Updated", item)}
            onItemDeleted={(item) => console.log("Deleted", item)}
          />
        </div>
      </AsyncLoader>
    </AsyncLoader>
  );
};
export default Expenses;
