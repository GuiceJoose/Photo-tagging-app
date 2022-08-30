import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StartModal from "./StartModal";
import TargetBox from "./TargetBox";
import Timer from "./Timer";
import { intervalToDuration, formatDuration } from "date-fns/";
import FeedbackMessage from "./FeedbackMessage";
import ScoresModal from "./ScoresModal";
import db from "./firebase.js";

const Puzzle = (props) => {
  const selectedPuzzleID = useParams().puzzID;
  const selectedPuzzle = props.puzzles[selectedPuzzleID - 1];
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
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
  const [responseMessage, setResponseMessage] = useState({
    isCorrect: false,
    message: "",
    coords: { x: 0, y: 0 },
    repaintKey: 0,
    imgSize: { width: null, height: null },
  });
  const [puzzleInfo, setPuzzleInfo] = useState([]);

  useEffect(() => {
    Fetchdata();
  }, [selectedPuzzleID]);

  const Fetchdata = () => {
    db.collection("puzzle-answers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          let data = element.data();
          setPuzzleInfo((arr) => [...arr, data]);
        });
      });
  };

  const selectedPuzzleCoords = puzzleInfo[selectedPuzzleID - 1];

  const handleStart = () => {
    setTimeStarted(new Date());
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

  const handleCorrectAttempt = (userChoice) => {
    setRemainingOptions(
      remainingOptions.filter((option) => {
        return option !== userChoice;
      })
    );
    setResponseMessage({
      isCorrect: true,
      message: `You found the ${userChoice}`,
      coords: { x: mouseCoords.x, y: mouseCoords.y },
      repaintKey: ++responseMessage.repaintKey,
      imgSize: { width: imgSize.width, height: imgSize.height },
    });
  };

  const handleWin = () => {
    setIsOver(true);
  };

  const checkUserAttempt = () => {
    const answer = selectedPuzzleCoords[userAttempt.option];
    if (
      userAttempt.coords.x >= answer[0] &&
      userAttempt.coords.x <= answer[1] &&
      userAttempt.coords.y >= answer[2] &&
      userAttempt.coords.y <= answer[3]
    ) {
      return true;
    } else {
      return false;
    }
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
    }
    if (checkUserAttempt()) {
      handleCorrectAttempt(userAttempt.option);
    }
    if (!checkUserAttempt()) {
      setResponseMessage({
        isCorrect: false,
        message: "Sorry, try again",
        coords: { x: mouseCoords.x, y: mouseCoords.y },
        repaintKey: ++responseMessage.repaintKey,
        imgSize: { width: imgSize.width, height: imgSize.height },
      });
    }
  }, [userAttempt]);

  useEffect(() => {
    if (remainingOptions.length === 0) {
      handleWin();
    }
  }, [remainingOptions]);

  return (
    <div className="puzzle">
      <Timer isStarted={isStarted} isOver={isOver} />
      {isStarted ? (
        ""
      ) : (
        <StartModal
          instructions={selectedPuzzle.instructions}
          handleStart={handleStart}
        />
      )}
      {isOver ? (
        <ScoresModal
          timeScore={formatDuration(
            intervalToDuration({
              start: timeStarted,
              end: new Date(),
            }),
            "seconds"
          )}
        />
      ) : (
        ""
      )}
      <FeedbackMessage {...responseMessage} />
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
          options={remainingOptions}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Puzzle;
