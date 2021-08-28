import { useEffect, useState } from "react";
import axios from "axios";

export const BarChart = () => {
  // get the data - load in when component mounts
  useEffect(async () => {
    const data = await axios.get(process.env.REACT_APP_COVID_API);
    console.log(data);
    return () => {};
  }, []);

  const drawChart = () => {};
  return <div id="chart">BarChart</div>;
};
