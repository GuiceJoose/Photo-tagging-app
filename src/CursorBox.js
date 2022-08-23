import React, { useEffect, useState } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    width: "0px",
    height: "0px",
  });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({
        x: ev.offsetX,
        y: ev.offsetY,
        width: ev.target.width,
        height: ev.target.height,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const CursorBox = () => {
  const mousePosition = useMousePosition();
  return (
    <div
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: mousePosition.width / 25,
        height: mousePosition.height / 25,
      }}
      className="cursor-box"
    ></div>
  );
};

export default CursorBox;
