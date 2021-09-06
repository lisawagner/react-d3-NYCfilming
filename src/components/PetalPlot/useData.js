import { useState, useEffect } from "react";
import { json } from "d3";

const jsonUrl =
  "https://gist.githubusercontent.com/lisawagner/f7cbb8bae9743cca9c12c7b9682adfee/raw/be92f9968fb97da543f3425652a7a128121d7b0b/iris_data.json";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      return d;
    };
    json(jsonUrl, row).then(setData);
  }, []);

  return data;
};
