import "./App.css";

// import { Follower } from "./components/Sample/Follower";
// import { TestGraph } from "./components/Sample/TestGraph";
import { SpeedRacer } from "./components/ScatterPlot/Scatter";

import { LineRacer } from "./components/SpeedRacer/LineRacer";
// import { FruitUpdate } from "./components/Sample/FruitUpdate";
// import { NestedFruitUpdate } from "./components/Sample/NestedFruitUpdates";

const App = () => {
  return (
    <div className="App">
      {/* <TestGraph /> */}
      {/* <NestedFruitUpdate /> */}
      <LineRacer />
      {/* <SpeedRacer /> */}
      {/* <FruitUpdate /> */}

      {/* <Follower /> */}
    </div>
  );
};

export default App;
