import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./styles.css";

// ******This is broken*************

const sample = [
  { category: "A", quantity: 40 },
  { category: "B", quantity: 151 },
  { category: "C", quantity: 89 },
  { category: "D", quantity: 124 },
];

export const BarGraph = () => {
  // Ref for updating dimensions
  const d3BarGraph = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Ref for updating resize event
  const update = useRef(false);

  useEffect(() => {
    // Listen for resize events
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // if resized, remove previous graph
      if (update.current) {
        d3.selectAll("g").remove();
      } else {
        update.current = true;
      }
    });
    // Draw graph and update dimensions
    return DrawGraph(sample, dimensions);
  }, [dimensions]);

  const margin = { top: 50, right: 30, bottom: 30, left: 60 };

  function DrawGraph(data, dimensions) {
    console.log(dimensions.width, dimensions.height);

    const graphWidth =
      parseInt(d3.select("#d3graphDemo").style("width")) -
      margin.left -
      margin.right;
    const graphHeight =
      parseInt(d3.select("#d3graphDemo").style("height")) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(d3BarGraph.current)
      .attr("width", graphWidth + margin.left + margin.right)
      .attr("height", graphHeight + margin.top + margin.bottom);

    // x scale
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, graphWidth - margin.right])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", "translate(0," + graphHeight + ")")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].category)
          .tickSizeOuter(0)
      );

    const max = d3.max(data, function (d) {
      return d.quantity;
    });

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([graphHeight, margin.top]);

    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

    //   Draw bars
    svg
      .append("g")
      .attr("fill", "#65f0eb")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.quantity))
      .attr("height", (d) => y(0) - y(d.quantity))
      .attr("width", x.bandwidth());
  }

  return <div id="d3graphDemo">{d3BarGraph}</div>;
};
