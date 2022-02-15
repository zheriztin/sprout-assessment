import './App.css';
import {Routes, Route} from "react-router-dom"
import {Home} from "./views/Home.js"
import {Detail} from "./views/Detail.js"

function App() {

  return (
    <div className="App">
    <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/:id" element={<Detail />} />
    </Routes>
    </div>
  );
}

export default App;
