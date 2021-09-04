import "./App.css";
// import { LineRacer } from "./components/SpeedRacer/LineRacer";
import { FruitUpdate } from "./components/Sample/FruitUpdate";
import { NestedFruitUpdate } from "./components/Sample/NestedFruitUpdates";

const App = () => {
  return (
    <div className="App">
      <FruitUpdate />
      <NestedFruitUpdate />
    </div>
  );
};

export default App;
