import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { useSelector } from "react-redux";

const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: "Rotate45",
  valueType: "Category",
};

const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}",
};

const Stacked = (props) => {
  const consumptionOverviewData = useSelector(
    (state) =>
      state?.reporting?.messIdToReportingDataMap?.[props.messId]
        ?.consumptionOverviewData
  );

  const consumedData = [];
  if (consumptionOverviewData?.consumed) {
    Object.keys(consumptionOverviewData?.consumed).forEach((item) => {
      consumedData.push({
        x: item,
        y: consumptionOverviewData.consumed[item],
      });
    });
  }

  const availableData = [];
  if (consumptionOverviewData?.available) {
    Object.keys(consumptionOverviewData?.available).forEach((item) => {
      availableData.push({
        x: item,
        y: consumptionOverviewData.available[item],
      });
    });
  }

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={"#fff"}
      legendSettings={{ background: "white" }}>
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          key="consumption"
          dataSource={consumedData}
          xName={"x"}
          yName={"y"}
          name={"Consumed"}
          type={"StackingColumn"}
          background={"blue"}
        />
        <SeriesDirective
          key="availability"
          dataSource={availableData}
          xName={"x"}
          yName={"y"}
          name={"Available"}
          type={"StackingColumn"}
          background={"red"}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
