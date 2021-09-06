import { useState } from "react";
import ReactDropdown from "react-select";
import * as d3 from "d3";

import { useData } from "./useData";
import { Marks } from "./Marks";
// import { Dropdown } from "./Dropdown";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import "./styles.css";

const width = 960;
const menuHeight = 55;
const height = 500 - menuHeight;
const margin = { top: 10, right: 30, bottom: 75, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 50;
const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

// get a value and return the label
const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

export const IrisScatterPlot = () => {
  const data = useData();

  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = (d) => d.species;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const siFormat = d3.format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      <div className="petal-container">
        <div className="menu-container">
          <span className="dropdown-label">X</span>
          <ReactDropdown
            className="dropdown-root"
            options={attributes}
            value={xAttribute}
            onChange={({ value }) => setXAttribute(value)}
          />
          <span className="dropdown-label">Y</span>
          <ReactDropdown
            className="dropdown-root"
            options={attributes}
            value={yAttribute}
            onChange={({ value }) => setYAttribute(value)}
          />
        </div>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={5}
            />
            <text
              className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${
                innerHeight / 2
              }) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
            <Marks
              data={data}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={7}
            />
          </g>
        </svg>
      </div>
    </>
  );
};
