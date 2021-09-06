import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { format } from "d3";
import "./styles.css";

const jsonURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export const SpeedRacerX = () => {
  // useRef - needed in React w/D3
  const svgRef = useRef(null);

  // dimensions
  const width = 960;
  const height = 800;
  const margin = { top: 40, right: 30, bottom: 50, left: 160 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  // useEffect instead of componentDidMount
  useEffect(() => {
    const xValue = (d) => d.Seconds;
    const yValue = (d) => d.Place;
    // set up canvas scale
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    // Create root container where we will append all other chart elements
    const svgEl = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

    // d3 margin convention
    const g = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // format xAxis
    const xAxisFormat = (number) => format(".4s")(number).replace("k", "s");
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(xAxisFormat)
      .tickSize(-innerHeight);

    // set the axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll(".domain, .tick line")
      .remove();

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 30)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text("Racetime in Seconds");

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", yScale.bandwidth());

    g.append("text")
      .attr("class", "title")
      .attr("y", -10)
      .text("Goofing off with D3js");

    // d3.json(jsonURL).then((data) => {
    //   data.forEach((d) => {
    //     // + parses strings into num
    //     d.Year = +d.Year;
    //   });
    //   Render(data);
    // });
  }, [data]);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  // fetch(jsonURL)
  // .then((response) => {
  //   return response.json();
  // })
  // .then((bikers) => {
  // bikers.map((biker) => console.log("Dudes:", biker.Name));
  // const Years = bikers.map((biker) => biker.Year);
  // console.log(Years);

  // const noDope = bikers.filter((biker) => biker.Doping === "");
  // console.log("NoDope:", noDope);

  // const yesDope = bikers.filter((biker) => biker.Doping !== "");
  // console.log("Doper:", yesDope);

  // const formatBiker = (biker) => {
  //   const { Name, Year, Time } = biker;
  //   return `${Year} ${Name}: ${Time}`;
  // };

  // const generateReport = (bikers, maxYears) =>
  //   bikers
  //     .filter((biker) => biker.Year < maxYears)
  //     .map(formatBiker)
  //     .join("\n");

  // const elBiker = document.getElementById("message");
  // const message = bikers[21].Name;
  // const message = formatBiker(bikers[17]);
  // const message = generateReport(bikers, 1997);
  // elBiker.textContent = message;
  // work with json data here
  // console.log("Sample Biker:", bikers[34]);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  return <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>;
};
