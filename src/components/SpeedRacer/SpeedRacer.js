import * as d3 from "d3";
import "./styles.css";

const jsonURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
const cyclist = {
  Time: "46:50",
  Place: 36,
  Seconds: 2790,
  Name: "Lisa Wagner",
  Year: 2021,
  Nationality: "CAN",
  Doping: "",
  Url: "",
};
const cyclists = [cyclist];

// console.log(cyclist);

export const SpeedRacer = () => {
  fetch(jsonURL)
    .then((response) => {
      return response.json();
    })
    .then((bikers) => {
      // bikers.map((biker) => console.log("Dudes:", biker.Name));
      // const Years = bikers.map((biker) => biker.Year);
      // console.log(Years);

      // const noDope = bikers.filter((biker) => biker.Doping === "");
      // console.log("NoDope:", noDope);

      // const yesDope = bikers.filter((biker) => biker.Doping !== "");
      // console.log("Doper:", yesDope);

      const formatBiker = (biker) => {
        const { Name, Year, Time } = biker;
        return `${Year} ${Name}: ${Time}`;
      };

      const generateReport = (bikers, maxYears) =>
        bikers
          .filter((biker) => biker.Year < maxYears)
          .map(formatBiker)
          .join("\n");

      const elBiker = document.getElementById("message");
      // const message = bikers[21].Name;
      // const message = formatBiker(bikers[17]);
      const message = generateReport(bikers, 1997);
      elBiker.textContent = message;
      // work with json data here
      console.log("Sample Biker:", bikers[34]);
    })
    .catch((err) => {
      console.log(err);
    });

  const width = 960;
  const height = 500;

  const svg = d3.select("svg").attr("width", width).attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const circle = g.append("circle");

  circle.attr("r", height / 2);
  circle.attr("fill", "yellow");
  circle.attr("stroke", "black");

  const eyeSpacing = 101;
  const eyeYOffset = -89;
  const eyeRadius = 40;
  const eyebrowWidth = 70;
  const eyebrowHeight = 20;
  const eyebrowYOffset = -70;

  const eyesG = g.append("g").attr("transform", `translate(0, ${eyeYOffset})`);

  const leftEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", -eyeSpacing);

  const rightEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", eyeSpacing);

  const eyebrowsG = eyesG
    .append("g")
    .attr("transform", `translate(0, ${eyebrowYOffset})`);

  eyebrowsG
    .transition()
    .duration(2000)
    .attr("transform", `translate(0, ${eyebrowYOffset - 50})`)
    .transition()
    .duration(2000)
    .attr("transform", `translate(0, ${eyebrowYOffset})`);

  const leftEyebrow = eyebrowsG
    .append("rect")
    .attr("x", -eyeSpacing - eyebrowWidth / 2)
    .attr("width", eyebrowWidth)
    .attr("height", eyebrowHeight);

  const rightEyebrow = eyebrowsG
    .append("rect")
    .attr("x", eyeSpacing - eyebrowWidth / 2)
    .attr("width", eyebrowWidth)
    .attr("height", eyebrowHeight);

  const mouth = g.append("path").attr(
    "d",
    d3.arc()({
      innerRadius: 150,
      outerRadius: 170,
      startAngle: Math.PI / 2,
      endAngle: (Math.PI * 3) / 2,
    })
  );

  return (
    <div>
      <h1>SpeedRacer</h1>
      <div id="svgData"></div>
      <div id="message"></div>
      <svg></svg>
    </div>
  );
};
