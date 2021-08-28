import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

import "./styles.css";

export const BarChart = () => {
  const [data, setData] = useState([]);

  // get the data - load in when component mounts
  useEffect(async () => {
    const data = await axios.get(process.env.REACT_APP_COVID_API);
    console.log(data.data);
    setData(data.data);
    drawChart();
    // return () => {};
  }, []);

  const drawChart = () => {
    const w = 800;
    const h = 600;
    const arrayLength = data.length;
    // iterate through data, take US State object and return the positive number
    // create a new array and pick the max from that new array to get the max value
    const arrayMax = Math.max.apply(
      Math,
      data.map(function (o) {
        return o.positive;
      })
    );

    let covidChart = d3
      .select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    // feed data into rectangles and create nodes with enter method
    // apppend attributes to rectangles
    covidChart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 100)
      .attr("width", w / arrayLength)
      .attr("fill", "blue");
  };
  return (
    <div id="chart">
      <h1>BarChart</h1>
    </div>
  );
};
