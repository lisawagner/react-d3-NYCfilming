// This updates on reload! OMG, why wasn't this part of the course?!

import React from "react";
import * as d3 from "d3";
import "./fruitStyles.css";

// const jsonURL =
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export const FruitUpdate = () => {
  const svgRef = React.useRef();

  React.useEffect(() => {
    const width = 960;
    const height = 500;

    const makeFruit = (type) => ({ type });
    const fruits = d3.range(5).map(() => makeFruit("apple"));

    const svg = d3
      .select(svgRef.current)
      .selectAll("circle")
      .data(fruits)
      .enter()
      .append("circle")
      .attr("fill", "red")
      .attr("cx", (d, i) => i * 120 + 60)
      .attr("cy", height / 2)
      .attr("r", 50);
  }, []);

  return (
    <div>
      <h1>FruitUpdate</h1>
      <svg width="960" height="500" ref={svgRef}></svg>
      <div id="message"></div>
    </div>
  );
};
