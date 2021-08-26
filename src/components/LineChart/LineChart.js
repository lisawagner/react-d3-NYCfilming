import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";

const LineChart = () => {
  // Render the graph and useEffect
  const d3Chart = useRef();

  useEffect(() => {
    //  Format dates
    const parseDate = d3.timeParse("%Y-%m-%d");
    // fetch the data through api endpoint
    fetch("https://data.cityofnewyork.us/resource/tg4x-b46p.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // transform data
        const permits = data.filter((event) => {
          return event.eventtype === "Shooting Permit";
        });
        console.log(permits);

        // lots of timestamps here, so create a time series
        // get all the dates (exclude time) and place in a new array
        const dates = [
          ...new Set(permits.map((each) => each.enteredon.slice(0, 10))),
        ];
        let CountsByDate = [];
        // count all the entries with the same date
        dates.map((time) => {
          let date = time;
          let count = 0;

          permits.forEach((each) => {
            let timestamp = each.enteredon.slice(0, 10);
            if (timestamp === date) {
              count += 1;
            }
          });

          //   permits.map((each) => {
          //     let timestamp = each.enteredon.slice(0, 10);
          //     if (timestamp === date) {
          //       count += 1;
          //     }
          //   });

          const counts = { date: parseDate(date), count: count };
          return CountsByDate.push(counts);
        });
        console.log(CountsByDate);

        //   set margin, width & height so elements are determined by the div size
        const margin = { top: 26, right: 30, bottom: 30, left: 30 };
        const width =
          parseInt(d3.select("#d3Demo").style("width")) -
          margin.left -
          margin.right;
        const height =
          parseInt(d3.select("#d3Demo").style("height")) -
          margin.top -
          margin.bottom;

        // set up chart - call the ref and set size for svg
        const svg = d3
          .select(d3Chart.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("background-color", "grey")
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        // Scale everything by data
        // We have the data points, what are the corresponding points in pixels?

        // x axis scale
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(CountsByDate, function (d) {
              return d.date;
            })
          )
          .range([0, width]);

        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // get max value of the counts
        const max = d3.max(CountsByDate, function (d) {
          return d.count;
        });

        // y axis scale
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Draw line
        svg
          .append("path")
          .datum(CountsByDate)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          //   then draw the line
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })

              .y(function (d) {
                return y(d.count);
              })
          );
        //   Add title
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", margin.top / 5 - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "white")
          .text("NYC Film Permits entered in 2021 - Shooting Permits");
      });
  }, []);

  return (
    <div id="d3Demo">
      <svg ref={d3Chart}></svg>
    </div>
  );
};

export default LineChart;
