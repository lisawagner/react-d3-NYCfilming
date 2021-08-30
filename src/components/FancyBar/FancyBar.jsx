import * as d3 from "d3";

import { Marks } from "./Marks";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useData } from "./useData";
import "./styles.css";

const width = 960;
const height = 500;
const margin = {
  top: 50,
  right: 50,
  bottom: 70,
  left: 220,
};
const xAxisLabelOffset = 55;

export const FancyBar = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const siFormat = d3.format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.14);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);
  return (
    <div className="f-bar">
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + xAxisLabelOffset}
          >
            Population
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
};
