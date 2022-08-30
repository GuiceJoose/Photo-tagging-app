import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Puzzle from "./Puzzle";

function App() {
  const puzzles = [
    {
      puzzID: 1,
      headerText: "Puzzle 1",
      imageURL: "puzzle-1.png",
      title: "Corn",
      instructions: "Find the hamster and the pear in the corn",
      options: ["Hamster", "Pear"],
    },
    {
      puzzID: 2,
      headerText: "Puzzle 2",
      imageURL: "puzzle-2.png",
      title: "Candy",
      instructions: "Find the spider and the candy corn",
      options: ["Spider", "Candy Corn"],
    },
    {
      puzzID: 3,
      headerText: "Puzzle 3",
      imageURL: "puzzle-3.png",
      title: "Ghosts",
      instructions: "Find the polar bear hiding among the ghosts",
      options: ["Polar Bear"],
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Home puzzles={puzzles} />} />
      <Route path="/puzzle/:puzzID" element={<Puzzle puzzles={puzzles} />} />
    </Routes>
  );
}

export default App;
