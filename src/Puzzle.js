import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StartModal from "./StartModal";
import TargetBox from "./TargetBox";
import Timer from "./Timer";

const Puzzle = (props) => {
  const selectedPuzzleID = useParams().puzzID;
  const selectedPuzzle = props.puzzles[selectedPuzzleID - 1];
  const correctAnswer = selectedPuzzle.answer;
  const [isStarted, setIsStarted] = useState(false);
  const [mouseCoords, setMouseCoords] = useState(null);
  const [imgSize, setImgSize] = useState(null);
  const [taggingBox, setTaggingBox] = useState(false);
  const [userAttempt, setUserAttempt] = useState({
    coords: { x: null, y: null },
    option: null,
  });
  const [remainingOptions, setRemainingOptions] = useState(
    selectedPuzzle.options
  );

  const handleStart = () => {
    setIsStarted(true);
  };

  const onMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    if (taggingBox) {
      setTaggingBox(false);
    } else {
      setTaggingBox(true);
      const imgWidth = event.nativeEvent.path[0].width;
      const imgHeight = event.nativeEvent.path[0].height;
      const mouseX = event.nativeEvent.offsetX;
      const mouseY = event.nativeEvent.offsetY;
      setMouseCoords({ x: mouseX, y: mouseY });
      setImgSize({ width: imgWidth, height: imgHeight });
    }
  };

  const checkUserAttempt = () => {
    return correctAnswer.some((ans) => {
      if (
        userAttempt.option === ans.option &&
        userAttempt.coords.x >= ans.xmin &&
        userAttempt.coords.x <= ans.xmax &&
        userAttempt.coords.y >= ans.ymin &&
        userAttempt.coords.y <= ans.ymax
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const handleUserAttempt = (e) => {
    const relX = Math.round((mouseCoords.x / imgSize.width) * 100);
    const relY = Math.round((mouseCoords.y / imgSize.height) * 100);
    const option = e.target.innerHTML;
    setUserAttempt({
      coords: { x: relX, y: relY },
      option: option,
    });

    setTaggingBox(false);
  };

  useEffect(() => {
    if (userAttempt.option === null) {
      return;
    } else if (checkUserAttempt()) {
      alert("yay");
    } else {
      alert("boo");
    }
  }, [userAttempt]);

  return (
    <div className="puzzle">
      {isStarted ? (
        <Timer />
      ) : (
        <StartModal
          instructions={selectedPuzzle.instructions}
          handleStart={handleStart}
        />
      )}
      <img
        onMouseDown={onMouseDown}
        id="image"
        className={isStarted ? "" : "isBlurred"}
        src={`/puzzle-${selectedPuzzleID}.png`}
        alt=""
      />
      {taggingBox ? (
        <TargetBox
          handleUserAttempt={handleUserAttempt}
          relcoords={[
            Math.round((mouseCoords.x / imgSize.width) * 100),
            Math.round((mouseCoords.y / imgSize.height) * 100),
          ]}
          coords={mouseCoords}
          imgSize={imgSize}
          options={selectedPuzzle.options}
        />
      ) : (
        ""
      )}
      {console.log(userAttempt)}
      {console.log(correctAnswer)}
    </div>
  );
};

export default Puzzle;
