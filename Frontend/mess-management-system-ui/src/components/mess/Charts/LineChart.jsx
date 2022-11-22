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
const data1 = [
  { week: "Week 1", expense: 35 },
  { week: "Week 2", expense: 34 },
  { week: "Week 3", expense: 40 },
  { week: "Week 4", expense: 35 },
  { week: "Week 5", expense: 38 },
  { week: "Week 6", expense: 25 },
];
const data2 = [
  { week: "Week 1", consumption: 45 },
  { week: "Week 2", consumption: 32 },
  { week: "Week 3", consumption: 67 },
  { week: "Week 4", consumption: 30 },
  { week: "Week 5", consumption: 38 },
  { week: "Week 6", consumption: 19 },
];

const LineChart = () => {
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
          dataSource={data1}
          xName="week"
          yName="expense"
          name="Purchased"
          width="2"
          marker={{ visible: true, width: 10, height: 10 }}
          type="Line"
        />
        <SeriesDirective
          dataSource={data2}
          xName="week"
          yName="consumption"
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
