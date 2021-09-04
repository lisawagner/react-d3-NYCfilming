import React from "react";
import * as d3 from "d3";
import "./styles.css";

const FetchData = (url) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const parseTime = (cyclists) => {
    cyclists.forEach((d) => {
      const timeParsed = d.Time.split(":");
      //   d.Time = new Date(1970, 0, 1, 0, timeParsed[0], timeParsed[1])
      d.Time = new Date(1900, 0, 1, 0, timeParsed[0], timeParsed[1]);
    });
    return cyclists;
  };

  const fetchURL = async () => {
    const response = await fetch(url);
    const json = await response.json();
    const cyclists = await parseTime(json);
    setData(cyclists);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading];
};

const DrawChart = ({ cyclists, svgRef, width, height }) => {
  // Set up cyclists data
  const yData = (d) => d.Time;
  const xData = (d) => d.Year;
  const nameData = (d) => d.Name;
  const doperData = (d) => d.Doping;
  const nationData = (d) => d.Nationality;
  const timeData = (d) => d3.timeFormat("%M:%S"(d.Time)); //for toolTips

  // Set up svg visualization
  const margin = { top: 50, right: 60, bottom: 50, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const r = 8;
  const padding = 1;

  // Create and position axes text labels and the title
  const titleText = "Doping in Professional Bicycle Racing";
  const titleXAxisPos = innerWidth / 2;
  const titleYAxisPos = -10;

  const subtitleText = "35 Fastest times up Alpe d'Huez";
  const subtitleYAxisPos = titleYAxisPos + 22;

  const yAxisLabelText = "Time in Minutes";
  const yAxisLabelXPos = -50;
  const yAxisLabelYPos = -50;

  // Set up Legend and Tooltips
  const legendXAxisTextPos = innerWidth;
  const legendYAxisTextOnePos = innerHeight * 0.4;
  const legendYAxisTextTwoPos = legendYAxisTextOnePos + 30;
  const legendXAxisSquaresPos = innerWidth + 10;
  const legendYAxisSquareOnePos = innerHeight * 0.37;
  const legendYAxisSquareTwoPos = legendYAxisSquareOnePos + 30;
  const legendSquaresSize = 20;

  const dopingAllegationsText = "Alleged dope use";
  const noDopingAllegationsText = "No doping found";

  const dopingAllegationColor = "#e83407";
  const noDopingAllegationCol = "#07e83f";

  // Create scatter plot
  const scatterplot = d3
    .select(svgRef.current)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Set up Scales
  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(cyclists, xData) - padding,
      d3.max(cyclists, xData) + padding,
    ])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleTime()
    .domain([d3.min(cyclists, yData), d3.max(cyclists, yData)])
    .range([0, innerHeight]);

  // Set up Axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat((d) => d3.timeFormat("%Y")(new Date(0).setFullYear(d)))
    .tickSizeOuter(0);
  const yAxis = d3
    .axisLeft(yScale)
    .tickFormat(d3.timeFormat("%M:%S"))
    .tickSizeOuter(0);

  scatterplot
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  const yAxisG = scatterplot.append("g").attr("id", "y-axis").call(yAxis);

  yAxisG
    .append("text")
    .attr("id", "yAxis-label")
    .attr("x", yAxisLabelXPos)
    .attr("y", yAxisLabelYPos)
    .attr("transform", "rotate(-90)")
    .text(yAxisLabelText);

  // Set up titles
  const titleSection = scatterplot.append("g").attr("text-anchor", "middle");

  titleSection
    .append("text")
    .attr("id", "title")
    .attr("x", titleXAxisPos)
    .attr("y", titleYAxisPos)
    .text(titleText);

  titleSection
    .append("text")
    .attr("id", "subtitle")
    .attr("x", titleXAxisPos)
    .attr("y", subtitleYAxisPos)
    .text(subtitleText);

  // Set up Legend
  const legendGrouping = scatterplot.append("g").attr("id", "legend");

  legendGrouping
    .append("text")
    .attr("class", "legend-text")
    .attr("x", legendXAxisTextPos)
    .attr("y", legendYAxisTextOnePos)
    .text(noDopingAllegationsText);

  legendGrouping
    .append("text")
    .attr("class", "legend-text")
    .attr("x", legendXAxisTextPos)
    .attr("y", legendYAxisTextTwoPos)
    .text(dopingAllegationsText);

  legendGrouping
    .append("rect")
    .attr("x", legendXAxisSquaresPos)
    .attr("y", legendYAxisSquareOnePos)
    .attr("width", legendSquaresSize)
    .attr("height", legendSquaresSize)
    .attr("fill", noDopingAllegationCol);

  legendGrouping
    .append("rect")
    .attr("x", legendXAxisSquaresPos)
    .attr("y", legendYAxisSquareTwoPos)
    .attr("width", legendSquaresSize)
    .attr("height", legendSquaresSize)
    .attr("fill", dopingAllegationColor);
  // Set up ToolTip
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // Show scatterplot
  scatterplot
    .selectAll("circle")
    .data(cyclists)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xData(d)))
    .attr("cy", (d) => yScale(yData(d)))
    .attr("r", (d) => r)
    .attr("class", "dot")
    .attr("data-xvalue", (d) => xData(d))
    .attr("data-yvalue", (d) => yData(d))
    .attr("fill", (d) => {
      if (doperData(d) === "") {
        return noDopingAllegationCol;
      } else {
        return dopingAllegationColor;
      }
    })
    .on("mouseover", (d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          `${nameData(d)}: ${nationData(d)} 
            </br>Year: ${xData(d)}, Time: ${timeData(d)}
            </br></br>${doperData(d)}`
        )
        // .style("left", d3.event.pageX + "px")
        // .style("top", d3.event.pageY + "px")
        .attr("data-year", xData(d));
    })
    .on("mouseout", (d) => {
      tooltip.transition().duration(500).style("opacity", 0);
    });
};

export const ScatterPlot = () => {
  const svgRef = React.useRef();

  const jsonURL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  const width = 960;
  const height = 500;
  const [data, loading] = FetchData(jsonURL);

  React.useEffect(() => {
    if (data.length !== 0) {
      DrawChart(data, svgRef, width, height);
    }
  }, [data, loading]);

  return (
    <div className="app">
      <h1>Scatter Plot</h1>
      <div className="vizContainer">
        <svg
          className="chart"
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
        ></svg>
      </div>
    </div>
  );
};
