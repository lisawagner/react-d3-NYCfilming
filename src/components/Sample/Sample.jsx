import { useEffect } from "react";
import * as d3 from "d3";

export const Sample = () => {
  useEffect(() => {
    example();
    return () => {};
  }, []);
  const example = () => {
    d3.selectAll("li").text("This is d3 test").style("color", "red");
  };
  return (
    <div id="sample">
      <ul>
        <li>This is a test</li>
        <li>This is a test</li>
        <li>This is a test</li>
        <li>This is a test</li>
      </ul>
    </div>
  );
};
