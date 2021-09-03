// This updates on reload! OMG, why wasn't this part of the course?!

import React from "react";
import * as d3 from "d3";
import "./nestedFruitStyles.css";

// const jsonURL =
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["red", "#EAE600"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

const xPosition = (d, i) => i * 120 + 60;

// render logic component
const renderViz = (svgElement, { fruits, height }) => {
  const groups = svgElement
    .selectAll("g") // makes empty selection
    .data(fruits, (d) => d.id); //creates & returns data-join with data array(fruits)
  const groupsEnter = groups
    .enter() // computes the () selection of circles with (5) data elements
    .append("g");

  groupsEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${i * 120 + 60},${height / 2})`);
  groups.exit().remove();

  groupsEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("r", (d) => radiusScale(d.type))
    .attr("fill", (d) => colorScale(d.type));

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text((d) => d.type)
    .attr("y", 80);
};

export const NestedFruitUpdate = () => {
  const svgRef = React.useRef();

  React.useEffect(() => {
    const width = 700;
    const height = 200;

    const svgElement = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const makeFruit = (type) => ({ type, id: Math.random() });
    let fruits = d3.range(5).map(() => makeFruit("apple"));

    // render fruits
    const render = () => {
      renderViz(svgElement, { fruits, height });
    };
    render();

    // state manipulation logic (update: eat an apple)
    setTimeout(() => {
      fruits.pop();
      render();
    }, 1000);

    // state manipulation logic (update: replace apple with lemon)
    setTimeout(() => {
      fruits[2].type = "lemon";
      render();
    }, 2000);

    // state manipulation logic (update: eat another apple)
    setTimeout(() => {
      fruits = fruits.filter((d, i) => i !== 1);
      render();
    }, 3000);
  }, []);

  return (
    <div>
      <h1>NestedFruitUpdate</h1>
      <svg width="960" height="500" ref={svgRef}></svg>
      <div id="message"></div>
    </div>
  );
};
