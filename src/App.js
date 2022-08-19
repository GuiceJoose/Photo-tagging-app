import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Puzzle from "./Puzzle";
import React, { useState } from "react";

function App() {
  const puzzles = [
    {
      puzzID: 1,
      headerText: "Puzzle 1",
      imageURL: "puzzle-1.png",
    },
    {
      puzzID: 2,
      headerText: "Puzzle 2",
      imageURL: "puzzle-2.png",
    },
    {
      puzzID: 3,
      headerText: "Puzzle 3",
      imageURL: "puzzle-3.png",
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
