import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

const data = [
  { x: "Rice", y: 37 },
  { x: "Lemon", y: 17 },
  { x: "Sugar", y: 19 },
  { x: "Others", y: 4 },
  { x: "Milk", y: 11 },
];

const PieChart = () => {
  return (
    <AccumulationChartComponent
      legendSettings={{ visible: true, background: "white" }}
      background={"#fff"}
      tooltip={{ enable: true }}>
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Expenses"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default PieChart;
