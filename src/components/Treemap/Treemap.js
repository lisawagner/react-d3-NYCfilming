import React from "react";
import * as d3 from "d3";
import "./styles.css";

const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = 445 - margin.left - margin.right;
const height = 445 - margin.top - margin.bottom;

const jsonURI =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json";

export const Treemap = () => {
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return (
    <>
      <div>
        <h1>treemap title</h1>
        <h2>treemap description</h2>
        <div>
          <p>dataCollection group 1: video games</p>
          <p>dataCollection group 2 kickstarter</p>
          <p>dataCollection group 3: movies</p>
        </div>
      </div>
      <div id="my_dataviz"></div>
    </>
  );
};
