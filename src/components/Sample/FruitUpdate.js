// This updates on reload! OMG, why wasn't this part of the course?!

import React from "react";
import * as d3 from "d3";
import "./fruitStyles.css";

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
const fruitBowl = (svgElement, { fruits, height }) => {
  const circles = svgElement
    .selectAll("circle") // makes empty selection
    .data(fruits, (d) => d.id); //creates and returns data-join with your data array(fruits)
  circles
    .enter() // computes the () selection of circles with (5) data elements
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles) //merges the enter and update selections
    .attr("fill", (d) => colorScale(d.type))
    // add onclick event listener
    .on("click", () => {
      // add tags onclick
      console.log("clicked");
    })
    .transition()
    .duration(1000)
    .attr("cx", xPosition)
    .attr("r", (d) => radiusScale(d.type));

  circles.exit().transition().duration(1000).attr("r", 0).remove();
};

export const FruitUpdate = () => {
  const svgRef = React.useRef();

  React.useEffect(() => {
    const width = 960;
    const height = 200;

    const svgElement = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const makeFruit = (type) => ({ type, id: Math.random() });
    let fruits = d3.range(5).map(() => makeFruit("apple"));
    let selectedFruit = null;

    // render fruits
    const renderViz = () => {
      fruitBowl(svgElement, { fruits, height });
    };
    renderViz();

    // state manipulation logic (update: eat an apple)
    setTimeout(() => {
      fruits.pop();
      renderViz();
    }, 1000);

    // state manipulation logic (update: replace apple with lemon)
    setTimeout(() => {
      fruits[2].type = "lemon";
      renderViz();
    }, 2000);

    // state manipulation logic (update: eat another apple)
    setTimeout(() => {
      fruits = fruits.filter((d, i) => i !== 1);
      renderViz();
    }, 3000);
  }, []);

  return (
    <div>
      <h1>FruitUpdate</h1>
      <svg width="960" height="500" ref={svgRef}></svg>
      <div id="message"></div>
    </div>
  );
};
