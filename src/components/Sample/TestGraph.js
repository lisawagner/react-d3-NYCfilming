import React from "react";
import * as d3 from "d3";

const width = 960;
const height = 500;
const circleRadius = 20;
const initialPosition = { x: width / 2, y: height / 2 };

export const TestGraph = () => {
  const svgRef = React.useRef();

  const [mousePosition, setMousePosition] = React.useState(initialPosition);

  //   const fetchData = async (url) => {
  //     const response = await fetch(url);
  //     return await response.json();
  //   };

  //   const jsonURL =
  //     "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  //   fetchData(jsonURL).then((text) => {
  //     console.log(text);
  //   });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <div>
      <h1>Haroo!</h1>
      <svg
        width={width}
        height={height}
        ref={svgRef}
        onMouseMove={handleMouseMove}
      >
        <circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
      </svg>
    </div>
  );
};
