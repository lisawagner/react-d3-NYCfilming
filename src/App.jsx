import "./App.css";
import { Treemap } from "./components/Treemap/Treemap";
// import { SamplePlot } from "./components/SamplePlot/SamplePlot";
// import { PetalPlot } from "./components/PetalPlot/PetalPlot";
// import { SpeedRacer } from "./components/ScatterPlot/Scatter";

const App = () => {
  return (
    <div className="App">
      {/* <PetalPlot /> */}
      {/* <SamplePlot /> */}
      <Treemap />
      {/* <SpeedRacer /> */}
    </div>
  );
};

export default App;
