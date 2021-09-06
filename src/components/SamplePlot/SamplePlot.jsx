import React from "react";
import * as d3 from "d3";

import "./styles.css";

const width = 960;
const menuHeight = 55;
const height = 500 - menuHeight;
const margin = { top: 10, right: 30, bottom: 75, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 50;

const jsonURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const useData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const cyclists = (d) => {
      // d.Doping = d.Doping;
      d.Year = +d.Year;
      d.Time = d3.timeParse("%M:%S")(d.Time);
      // d.Time = +d.Time;
      console.log(d.Time);
      return d;
    };
    d3.json(jsonURL, cyclists).then(setData);
  }, []);

  return data;
};

// const useData = () => {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     const parseTime = d3.timeParse("%M:%S");

//     fetch(jsonURL).then((response => response.json()).then((data) => {
//       console.log("First:",data);
//       // transform data
//     })

//     )
//   }, []);
//   return data;
// }

const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-tickOffset * 2}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        dy="1.2em"
        y={innerHeight + tickOffset}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));

const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  colorValue,
  tooltipFormat,
  circleRadius,
}) =>
  data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));

export const SamplePlot = () => {
  const data = useData();
  console.log(data);
  const xValue = (d) => d.Year;
  const xAxisLabel = "Year";

  const yValue = (d) => d.Time;
  const yAxisLabel = "Time";

  const colorValue = (d) => d.Doping;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xAxisTickFormat = (d) =>
    d3.timeFormat("%Y")(new Date(0).setFullYear(d));
  const yAxisTickFormat = (d) => d.Time;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    // .scaleLinear()
    .scaleTime()
    .domain(d3.extent(data, yValue))
    // .domain(d3.extent(data.map((d) => parseTime(d.Time))))
    .range([0, innerHeight]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      <div className="petal-container">
        <span className="title">Dopers Dataset</span>
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
            <AxisLeft
              yScale={yScale}
              innerWidth={innerWidth}
              tickFormat={yAxisTickFormat}
              tickOffset={5}
            />
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
