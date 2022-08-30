import { Link } from "react-router-dom";

const ScoresModal = (props) => {
  return (
    <div className="scores-modal">
      <div className="scores-modal-box">
        <h3>Your time: {props.timeScore}</h3>
        <form className="score-form">
          <label for="name">Please enter your name:</label>
          <input type="text" id="name"></input>
          <button type="button">Submit</button>
        </form>
        {/* <HighScores /> */}
        <Link to="/">More Puzzles</Link>
      </div>
    </div>
  );
};

export default ScoresModal;
