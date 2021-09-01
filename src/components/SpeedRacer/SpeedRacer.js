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

      const toolTip = (biker) => {
        const { Name, Nationality, Time } = biker;

        return `${Name} ${Nationality} ${Time}`;
      };
      console.log(toolTip);

      // work with json data here
      console.log("Sample Biker:", bikers[34]);
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
