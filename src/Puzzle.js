import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StartModal from "./StartModal";
import Header from "./Header";

const Puzzle = (props) => {
  const selectedPuzzleID = useParams().puzzID;
  const selectedPuzzle = props.puzzles[selectedPuzzleID - 1];
  const [isStarted, setIsStarted] = useState(false);
  const [mouseCoords, setMouseCoords] = useState("");
  const handleStart = () => {
    setIsStarted(true);
  };
  const onMouseDown = (event) => {
    const imgWidth = event.nativeEvent.path[0].width;
    const imgHeight = event.nativeEvent.path[0].height;
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const relX = Math.round((mouseX / imgWidth) * 100);
    const relY = Math.round((mouseY / imgHeight) * 100);
    setMouseCoords({ x: relX, y: relY });
  };
  return (
    <div className="puzzle">
      <Header headerText={selectedPuzzle.headerText} />
      {isStarted ? "" : <StartModal handleStart={handleStart} />}
      <div>{console.log(mouseCoords)}</div>
      <img
        onMouseDown={onMouseDown}
        id="image"
        className={isStarted ? "" : "isBlurred"}
        src={`/puzzle-${selectedPuzzleID}.png`}
      />
    </div>
  );
};

export default Puzzle;
