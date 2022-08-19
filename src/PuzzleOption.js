import { Link } from "react-router-dom";

const PuzzleOption = (props) => {
  return (
    <Link to={`puzzle/${props.puzzID}`} className="puzzle-option">
      <h3 className="puzzle-option-title">{props.headerText}</h3>
      <img src={props.imageURL} className="puzzle-option-image"></img>
    </Link>
  );
};

export default PuzzleOption;
