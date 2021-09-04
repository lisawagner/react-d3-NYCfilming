import "./App.css";
import { TestGraph } from "./components/Sample/TestGraph";
// import { LineRacer } from "./components/SpeedRacer/LineRacer";
// import { FruitUpdate } from "./components/Sample/FruitUpdate";
// import { NestedFruitUpdate } from "./components/Sample/NestedFruitUpdates";

const App = () => {
  return (
    <div className="App">
      {/* <FruitUpdate />
      <NestedFruitUpdate /> */}
      <TestGraph />
    </div>
  );
};

export default App;
