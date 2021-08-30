import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

import "./styles.css";

export const Lchart = () => {
  const [data] = useState([25, 50, 35, 15, 94, 10]);
  const svgRef = useRef();

  // useEffect is used in modern React instead of componentDidMount, et al.
  useEffect(() => {
    // set up svg
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#d3d3d3")
      .style("margin-top", "30")
      .style("margin-bottom", "30")
      .style("overflow", "visible");

    // set up the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);

    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // set up the axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    // set up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [data]);

  return (
    <div classname="lChart">
      <svg ref={svgRef}></svg>
    </div>
  );
};
