import { LineChart } from "./components/LineChart/LineChart";
import { Lchart } from "./components/Lchart/Lchart";
import { FancyBar } from "./components/FancyBar/FancyBar";
import { PetalPlot } from "./components/PetalPlot/PetalPlot";

// import { Sample } from "./components/Sample/Sample";
// import { BarChart } from "./components/BarChart/BarChart";
// import { BarGraph } from "./components/BarGraph/BarGraph";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <PetalPlot />
      <FancyBar />
      <Lchart />
      <LineChart />
      {/* <Sample /> */}

      {/* <BarChart /> */}
      {/* <BarGraph /> */}
    </div>
  );
};

export default App;
