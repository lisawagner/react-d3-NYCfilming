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

  const margin = { top: 10, right: 100, bottom: 30, left: 50 };
  const svgDimensions = { width: 960, height: 500 };
  const width = svgDimensions.width - margin.left - margin.right;
  const height = svgDimensions.height - margin.top - margin.bottom;
  const radius = 4;

  const parseTime = (timeData) => {
    let time = new Date();
    let [mm, ss] = timeData.split(":");
    time.setMinutes(mm);
    time.setSeconds(ss);
    return time;
  };

  const xField = d3
    .scaleTime()
    .domain(d3.extent(cyclist.map((d) => new Date(d.Year, 0, 0))))
    .range([0, width]);

  const yField = d3
    .scaleTime()
    .domain(d3.extent(cyclist.map((d) => parseTime(d.Time))))
    .range([height, 0]);

  const svgPlot = d3.select(svgRef.current);
  svgPlot
    .select("#x-axis")
    .call(d3.axisBottom(xField).tickFormat(d3.timeFormat("%Y")));

  svgPlot
    .select("#y-axis")
    .call(d3.axisLeft(yField).tickFormat(d3.timeFormat("%M:%S")));

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
      const yearFormat = new Date(d.Year, 0, 0);
      const timeFormat = parseTime(d.Time);
      return (
        <circle
          className="dot"
          cx={xField(yearFormat)}
          cy={yField(timeFormat)}
          // r={radius}
          r={d.Doping !== "" ? `${radius}` : `${radius + 2}`}
          fill={d.Doping !== "" ? "#673ab7" : "#26c6da"}
          data-xvalue={yearFormat}
          data-yvalue={timeFormat}
          onMouseOver={(e) => handleCircleHover(d, e)}
          onMouseLeave={handleCircleUnhover}
        ></circle>
      );
    });

  const Dot = ({ Doper }) => (
    <div
      className="dot-legend"
      style={{ backgroundColor: Doper ? "#673ab7" : "#26c6da" }}
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
            width={svgDimensions.width}
            height={svgDimensions.height}
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
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
            <Dot Doper={false} />
            No doping alllegations
          </p>
          <p>
            <Dot Doper={true} />
            Riders with doping allegations
          </p>
        </div>
      </div>
      <div id="tooltip" ref={tooltipRef}></div>
    </div>
  );
};
