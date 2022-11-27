import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const CustomDropDown = (props) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id={props.id}
      fields={props.fields}
      width={props.width}
      placeholder={props.placeholder}
      value={props.selectedValue}
      onChange={(data) => props.onValueChanged(data.value)}
      dataSource={props.data}
    />
  </div>
);

export default CustomDropDown;
