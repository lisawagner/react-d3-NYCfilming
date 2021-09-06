import * as d3 from "d3";
import "./styles.css";

const jsonURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

export const ScatterRacer = () => {
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
  const xLabel = "Year";
  const yLabel = "Racetime";

  const svg = d3.select("svg").attr("width", width).attr("height", height);

  const render = (data) => {
    const xValue = (d) => d.Year;
    // const yValue = (d) => d.Time;
    const yValue = (d) => d3.timeParse("%M:%S")(d.Time);

    // set up canvas scale
    const xScale = d3
      .scaleLinear()
      // d3 has a function to go from min-max called extent
      // .domain([d3.min(data, xValue), d3.max(data, xValue)])
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleTime()
      .domain([d3.max(data, yValue), d3.min(data, yValue)])
      // .range([0, innerHeight])
      .range([0, innerHeight])
      .nice();

    // d3 margin convention
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => d)
      .tickSize(-innerHeight)
      .tickPadding(8);

    // set the axis
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

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat(d3.timeFormat("%M:%S"))
      .tickSize(-innerWidth)
      .tickPadding(8);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.select(".domain").remove();

    // add yAxis label
    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yLabel);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      // .attr("cx", (d) => xScale(new Date(d.Year, 0, 1)))
      // .attr("cx", (d) => yScale(new Date(0, 0, 0, 0, 0, d.Seconds)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("r", circleRadius);

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2.5)
      .attr("y", 30)
      .text(gTitle);
  };

  d3.json(jsonURL).then((data) => {
    // parse data into appropriate format
    data.forEach((d) => {
      // + parses strings into num
      // d.Year = +d.Year;
      // d.Time = d3.timeParse("%M:%S")(d.Time);
      // console.log(d.Time);
    });
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
