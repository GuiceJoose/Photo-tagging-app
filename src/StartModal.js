const StartModal = (props) => {
  return (
    <div className="start-modal">
      <div className="start-modal-box">
        <div className="instructions">{props.instructions}</div>
        <button
          onClick={props.handleStart}
          type="button"
          className="start-button"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartModal;
