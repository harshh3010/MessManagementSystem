import {
  GridComponent,
  Inject,
  Edit,
  Sort,
  Toolbar,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { useRef } from "react";

const CustomGrid = (props) => {
  // TODO: Add validation before adding/editing items

  const gridRef = useRef();

  const onActionBegin = (args) => {
    // Hiding columns during editing
    if (args.requestType === "beginEdit") {
      for (const column of gridRef.current.columns) {
        if (!props.allowedColumnsForEdit?.includes(column.field)) {
          column.visible = false;
        }
      }
    }
    // Hiding columns during addition
    if (args.requestType === "add") {
      for (const column of gridRef.current.columns) {
        if (!props.allowedColumnsForAdd?.includes(column.field)) {
          column.visible = false;
        }
      }
    }
    // Displaying columns after done editing or adding
    if (args.requestType === "save" || args.requestType === "cancel") {
      for (const column of gridRef.current.columns) {
        column.visible = true;
      }
    }
  };

  const onActionComplete = (args) => {
    if (args.requestType === "save" && args.action === "add") {
      props.onItemAdded?.(args.data);
    } else if (args.requestType === "save" && args.action === "edit") {
      props.onItemUpdated?.(args.data);
    } else if (args.requestType === "delete") {
      props.onItemDeleted?.(args.data);
    }
  };

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
  };

  const toolbarOptions = ["Add", "Edit", "Delete", "Search", "Print"];
  return (
    <GridComponent
      dataSource={props.dataSource}
      enableHover={true}
      allowPaging={true}
      allowSorting={true}
      pageSettings={{ pageCount: 5 }}
      actionBegin={onActionBegin}
      actionComplete={onActionComplete}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      ref={gridRef}
      {...props}>
      <ColumnsDirective>
        {props.grid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[Edit, Toolbar, Sort]} />
    </GridComponent>
  );
};

export default CustomGrid;
