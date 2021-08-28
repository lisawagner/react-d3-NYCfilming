import { LineChart } from "./components/LineChart/LineChart";
import { Sample } from "./components/Sample/Sample";
import { BarChart } from "./components/BarChart/BarChart";
// import { BarGraph } from "./components/BarGraph/BarGraph";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <LineChart />
      <Sample />
      <BarChart />
      {/* <BarGraph /> */}
    </div>
  );
};

export default App;
