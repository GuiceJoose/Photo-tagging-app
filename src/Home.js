import PuzzleOption from "./PuzzleOption";
import Header from "./Header";
import React from "react";

const Home = (props) => {
  const puzzles = props.puzzles;
  return (
    <div className="home">
      <Header headerText="Hide and Seek Puzzles" />
      <div className="puzzle-options-wrapper">
        {puzzles.map((puzzle) => {
          return (
            <PuzzleOption
              key={puzzle.puzzID}
              puzzID={puzzle.puzzID}
              headerText={puzzle.headerText}
              imageURL={puzzle.imageURL}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
