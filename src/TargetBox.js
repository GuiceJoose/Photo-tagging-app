const TargetBox = (props) => {
  return (
    <div
      className="target-box"
      style={{
        left: props.coords.x,
        top: props.coords.y,
        width: props.imgSize.width / 25,
        height: props.imgSize.height / 25,
      }}
    >
      <div className="target-menu">
        {props.options.map((option, index) => {
          return (
            <button
              key={index}
              onClick={props.handleUserAttempt}
              type="button"
              className="target-menu-item"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TargetBox;
