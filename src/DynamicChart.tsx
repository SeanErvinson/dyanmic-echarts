import {
  BarSeriesOption,
  DatasetComponentOption,
  EChartsOption,
  GridComponentOption,
  LineSeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";
import EChartsReact from "echarts-for-react";
import { useEffect, useRef } from "react";
import _, { Dictionary } from "lodash";

type GraphType = "A" | "B";
export type Data = {
  type: GraphType;
  name: string;
};

const DynamicChart = ({ data }: { data: Data[] }) => {
  const chartRef = useRef<EChartsReact>(null);
  const groupGraphType: Dictionary<Data[]> = _.groupBy(data, (d) => d.type);

  const grid: GridComponentOption[] = [
    ...Object.keys(groupGraphType).map<GridComponentOption>((type, index) => {
      let size = 100;
      if (type === "B") size = 120;
      return {
        id: type,
        top: size * index + (index === 0 ? 0 : 10),
        backgroundColor: "red",
        height: size,
      };
    }),
  ];

  const xAxis: XAXisComponentOption[] = [
    ...Object.keys(groupGraphType).map<XAXisComponentOption>((type) => {
      return {
        gridId: type,
        id: type,
        type: "time",
      };
    }),
  ];

  const yAxis: YAXisComponentOption[] = [
    ...Object.keys(groupGraphType).map<YAXisComponentOption>((type) => {
      return {
        gridId: type,
        id: type,
        type: type === "A" ? "category" : "value",
      };
    }),
  ];

  const series = [
    ...(groupGraphType?.A?.map<BarSeriesOption>((data) => ({
      xAxisId: data.type,
      yAxisId: data.type,
      datasetId: `${data.name}${data.type}`,
      type: "bar",
      encode: {
        x: 0,
      },
    })) ?? []),
    ...(groupGraphType?.B?.map<LineSeriesOption>((data) => ({
      xAxisId: data.type,
      yAxisId: data.type,
      datasetId: `${data.name}${data.type}`,
      type: "line",
    })) ?? []),
  ];

  const dataset = [
    ...(groupGraphType?.A?.map<DatasetComponentOption>((data) => ({
      id: `${data.name}${data.type}`,
      source: [
        ["2024-01-01"],
        ["2024-01-02"],
        ["2024-01-03"],
        ["-"],
        ["2024-01-05"],
      ],
    })) ?? []),
    ...(groupGraphType?.B?.map<DatasetComponentOption>((data) => ({
      id: `${data.name}${data.type}`,
      source: [
        ["2024-01-01", 100],
        ["2024-01-02", 200],
        ["2024-01-03", 300],
        ["2024-01-04", "-"],
        ["2024-01-05", 400],
      ],
    })) ?? []),
  ];

  const chartOption: EChartsOption = {
    grid: grid,
    xAxis: xAxis,
    yAxis: yAxis,
    series: series,
    animation: false,
    dataset: dataset,
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance();
    if (chart) {
      chart.setOption(chartOption, {
        replaceMerge: ["series", "xAxis", "yAxis", "grid"],
      });
    }
  }, [chartRef, chartOption]);

  return (
    <EChartsReact
      style={{
        width: 1000,
        height: 400,
      }}
      option={chartOption}
      ref={chartRef}
    />
  );
};

export default DynamicChart;
