import styled from "styled-components";
import "./App.css";
import DynamicChart, { Data } from "./DynamicChart";
import { useState } from "react";
import DynamicChartKBox from "./DynamicChartKBox";

function App() {
  const [barcharts, setBarCharts] = useState<Data[]>([]);
  const [lineCharts, setLineCharts] = useState<Data[]>([]);

  const handleAddBarChart = () =>
    setBarCharts((prev) => [
      ...prev,
      { type: "A", name: `${barcharts.length}` },
    ]);
  const handleAddLineChart = () =>
    setLineCharts((prev) => [
      ...prev,
      { type: "B", name: `${lineCharts.length}` },
    ]);
  const handleRemoveBarChart = () => setBarCharts((prev) => prev.slice(0, -1));
  const handleRemoveLineChart = () =>
    setLineCharts((prev) => prev.slice(0, -1));

  return (
    <>
      <Card>
        <DynamicChart data={[...barcharts, ...lineCharts]} />
        <DynamicChartKBox data={[...barcharts, ...lineCharts]} />
      </Card>
      <button onClick={handleAddBarChart}>Add Bar</button>
      <button onClick={handleAddLineChart}>Add Line</button>
      <button onClick={handleRemoveBarChart}>Remove Bar</button>
      <button onClick={handleRemoveLineChart}>Remove Line</button>
    </>
  );
}

const Card = styled.div(() => ({
  borderRadius: `4px`,
  background: "#242424",
  padding: "16px",
  overflow: `hidden`,
}));

export default App;
