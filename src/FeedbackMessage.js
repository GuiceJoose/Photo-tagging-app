const FeedbackMessage = (props) => {
  const relX = (props.coords.x / props.imgSize.width) * 100;
  return (
    <div
      style={{
        top: props.coords.y,
        left: relX < 50 ? props.coords.x : props.coords.x / 2,
        color: props.isCorrect ? "green" : "red",
      }}
      className="feedback-message"
      id="hide-feedback-message"
      key={props.repaintKey}
    >
      {props.message}
    </div>
  );
};

export default FeedbackMessage;
