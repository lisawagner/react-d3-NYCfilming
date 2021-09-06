import React from "react";
import * as d3 from "d3";
import "./pstyles.css";

const useData = () => {
  const jsonURL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  const [data, setData] = React.useState();

  React.useEffect(() => {
    d3.json(jsonURL).then((d) => {
      setData(d);
    });
    // fetch(jsonURL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const bikers = data.map((d) => {
    //       return {
    //         Name: d.Name,
    //         Year: +d.Year,
    //         Time: +d.Time,
    //         Seconds: +d.Seconds,
    //         Place: +d.Place,
    //         Doping: d.Doping,
    //       };
    //     });
    //     console.log("[data]", bikers);
    //     setData(bikers);
    //   });
  }, []);
  //   return data;
  return () => undefined;
};

const AxisBottom = ({ xScale, innerHeight }) => {
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line y2={innerHeight} />
      <text style={{ textAnchor: "middle" }} dy="1.2em" y={innerHeight}>
        {tickValue}
      </text>
    </g>
  ));
};

const AxisLeft = ({ yScale, innerWidth }) => {
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text key={tickValue} style={{ textAnchor: "end" }} x={-3 * 2} dy=".32em">
        {tickValue}
      </text>
    </g>
  ));
};

const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  colorValue,
  circleRadius,
}) => {
  data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
    >
      <title>{xValue(d)}</title>
    </circle>
  ));
};

export const Plotter = () => {
  const svgRef = React.useRef(null);
  const data = useData();

  const width = 960;
  const height = 800;
  const margin = { top: 40, right: 30, bottom: 50, left: 160 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 8;

  const gTitle = "Goofing off with D3js";
  const xLabel = "Year";
  const yLabel = "Time";

  // Create root container where we will append all other chart elements
  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height);
  svg.selectAll("*").remove(); // Clear svg content before adding new elements

  const xValue = (d) => d.Year;
  const yValue = (d) => d.Time;

  const colorValue = (d) => d.Doper;

  console.log("Hello:", data);
  //   data.map((d) => d.Year) => console.log(Years);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleTime()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#137B80", "#8E6C8A"]);

  return (
    <div>
      <h1>Plotter</h1>
      <svg ref={svgRef} width={width} height={height}>
        <g>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            // tickFormat={xAxisTickFormat}
            // tickOffset={5}
          />
          {/* <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} /> */}
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <Marks
            data={data}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            // tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </div>
  );
};
