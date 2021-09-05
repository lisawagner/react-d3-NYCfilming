// import { useEffect, useState, useRef } from "react";
import React from "react";
import * as d3 from "d3";
import axios from "axios";

import "./styles.css";

export const SpeedRacer = () => {
  const [cyclist, setCyclist] = React.useState([
    {
      Time: "0",
      Place: 0,
      Seconds: 0,
      Name: "",
      Year: 1990,
      Nationality: "",
      Doping: "",
      URL: "",
    },
  ]);

  const jsonURL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  React.useEffect(() => {
    axios
      .get(jsonURL)
      .then((response) => response.data)
      .then((data) => {
        setCyclist(data);
      });
  }, []);

  const svgRef = React.useRef();
  const tooltipRef = React.useRef();

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const svgDims = { width: 700, height: 400 };
  const width = svgDims.width - margin.left - margin.right;
  const height = svgDims.height - margin.top - margin.bottom;

  const parseTime = (rawTime) => {
    let time = new Date();
    let [mm, ss] = rawTime.split(":");
    time.setMinutes(mm);
    time.setSeconds(ss);
    return time;
  };

  const x = d3
    .scaleTime()
    .domain(d3.extent(cyclist.map((d) => new Date(d.Year, 0, 0))))
    .range([0, width]);

  const y = d3
    .scaleTime()
    .domain(d3.extent(cyclist.map((d) => parseTime(d.Time))))
    .range([height, 0]);

  const svg = d3.select(svgRef.current);

  const xAxis = svg
    .select("#x-axis")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

  const yAxis = svg
    .select("#y-axis")
    .call(d3.axisLeft(y).tickFormat(d3.timeFormat("%M:%S")));

  const tooltip = d3.select(tooltipRef.current).style("opacity", 0);

  const handleCircleHover = (d, event) => {
    tooltip.attr("data-year", new Date(d.Year, 0, 0)).style("opacity", 1);
    tooltip
      .html(
        `
      <p><strong>${d.Name}</strong></p><br />
      <p>Year :${d.Year}, Time: ${d.Time}</p><br />
      <p>${d.Doping}</p>
    `
      )
      .style("left", event.clientX + "px")
      .style("top", event.clientY + "px");
  };

  const handleCircleUnhover = () => tooltip.style("opacity", 0);

  const translateXAxis = `translate(${margin.left}, ${margin.top + height})`;
  const translateYAxis = `translate(${margin.left}, ${margin.top})`;
  const translateDots = `translate(${margin.left}, ${margin.top})`;

  const Dots = ({ data }) =>
    data.map((d) => {
      const yearDateFormat = new Date(d.Year, 0, 0);
      const timeDateFormat = parseTime(d.Time);
      return (
        <circle
          className="dot"
          cx={x(yearDateFormat)}
          cy={y(timeDateFormat)}
          r="5"
          fill={d.Doping !== "" ? "#673ab7" : "#26c6da"}
          data-xvalue={yearDateFormat}
          data-yvalue={timeDateFormat}
          onMouseOver={(e) => handleCircleHover(d, e)}
          onMouseLeave={handleCircleUnhover}
        ></circle>
      );
    });

  const Dot = ({ hadDoped }) => (
    <div
      className="dot-legend"
      style={{ backgroundColor: hadDoped ? "#673ab7" : "#26c6da" }}
    ></div>
  );

  return (
    <div id="container">
      <div id="scatterplot">
        <div id="header-wrapper">
          <h1 id="title">Doping in Professional Bicycle Racing</h1>
          <p>35 Fastest times up Alpe d'Huez</p>
        </div>
        <div id="chart-wrapper">
          <svg
            width={svgDims.width}
            height={svgDims.height}
            viewBox={`0 0 ${svgDims.width} ${svgDims.height}`}
            ref={svgRef}
          >
            <g id="x-axis" transform={translateXAxis}></g>
            <g id="y-axis" transform={translateYAxis}></g>
            <g id="dots" transform={translateDots}>
              <Dots data={cyclist} />
            </g>
          </svg>
        </div>
        <div id="legend">
          <p>
            <Dot hadDoped={false} />
            No doping alllegations
          </p>
          <p>
            <Dot hadDoped={true} />
            Riders with doping allegations
          </p>
        </div>
      </div>
      <div id="tooltip" ref={tooltipRef}></div>
    </div>
  );
};
