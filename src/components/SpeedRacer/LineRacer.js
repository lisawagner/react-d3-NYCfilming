import * as d3 from "d3";
import "./pstyles.css";

const jsonURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export const LineRacer = () => {
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

  const width = 960;
  const height = 800;
  const margin = { top: 40, right: 30, bottom: 50, left: 160 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 8;

  const gTitle = "Goofing off with D3js";
  const xLabel = "Racetime in Seconds";
  const yLabel = "Place";

  const svg = d3.select("svg").attr("width", width).attr("height", height);

  const render = (data) => {
    const xValue = (d) => d.Seconds;
    const yValue = (d) => d.Place;

    // set up canvas scale
    const xScale = d3
      .scaleLinear()
      // d3 has a function to go from min-max called extent
      // .domain([d3.min(data, xValue), d3.max(data, xValue)])
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight])
      .nice();

    // d3 margin convention
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(8);

    // set the axis

    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(8);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.select(".domain").remove();

    // add yAxis label
    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -25)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();
    // add xAxis label
    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 36)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xLabel);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", circleRadius);

    g.append("text").attr("class", "title").attr("y", -10).text(gTitle);
  };

  d3.json(jsonURL).then((data) => {
    // data.forEach((d) => {
    //   // + parses strings into num
    //   d.Year = +d.Year;
    // });
    render(data);
  });

  return (
    <div>
      <h1>LineRacer</h1>
      <svg></svg>
      <div id="svgData"></div>
      <div id="message"></div>
    </div>
  );
};
