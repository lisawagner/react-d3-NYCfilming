import "./App.css";
import { SamplePlot } from "./components/SamplePlot/SamplePlot";
// import { PetalPlot } from "./components/PetalPlot/PetalPlot";
// import { SpeedRacer } from "./components/ScatterPlot/Scatter";

const App = () => {
  return (
    <div className="App">
      {/* <PetalPlot /> */}
      <SamplePlot />
      {/* <SpeedRacer /> */}
    </div>
  );
};

export default App;
