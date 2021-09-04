import React from "react";
import * as d3 from "d3";

// const width = 960;
// const height = 500;

export const TestGraph = () => {
  const svgRef = React.useRef();

  const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

  const jsonURL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  fetchData(jsonURL).then((text) => {
    console.log(text);
  });

  return (
    <div>
      <h1>Haroo!</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};
