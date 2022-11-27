import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  Tooltip,
  Category,
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";

const primaryXAxis = { valueType: "Category" };
const primaryYAxis = { labelFormat: "{value} units" };

const LineChart = (props) => {
  return (
    <ChartComponent
      id="line-chart"
      primaryXAxis={primaryXAxis}
      primaryYAxis={primaryYAxis}
      tooltip={{ enable: true }}
      chartArea={{ border: { width: 0 } }}
      legendSettings={{ background: "white" }}>
      <Inject
        services={[ColumnSeries, LineSeries, Legend, Tooltip, Category]}
      />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={props.purchasedData}
          xName="week"
          yName="quantity"
          name="Purchased"
          width="2"
          marker={{ visible: true, width: 10, height: 10 }}
          type="Line"
        />
        <SeriesDirective
          dataSource={props.consumedData}
          xName="week"
          yName="quantity"
          name="Consumed"
          width="2"
          marker={{ visible: true, width: 10, height: 10 }}
          type="Line"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
