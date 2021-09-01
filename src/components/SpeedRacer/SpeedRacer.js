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

console.log(cyclist);

export const SpeedRacer = () => {
  fetch(jsonURL)
    .then((response) => {
      return response.json();
    })
    .then((bikers) => {
      // for (let i = 0; i < bikers.length; i++) {
      //   const biker = bikers[i];
      //   console.log(biker.Name);
      // }
      bikers.forEach((biker) => {
        console.log("what:", biker.Name);
      });
      const tempYears = (biker) => {
        console.log(biker.Year);
      };
      bikers.forEach(tempYears);
      // work with json data here
      console.log("bikers:", bikers[34]);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <h1>SpeedRacer</h1>
      <div id="svgData"></div>
    </div>
  );
};
