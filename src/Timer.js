import { useState, useEffect } from "react";

const Timer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = () => {
      setTimeElapsed(timeElapsed + 1);
    };
    const int = setInterval(timer, 1000);
    return () => clearInterval(int);
  }, [timeElapsed]);

  return (
    <h1>{new Date(timeElapsed * 1000).toISOString().substring(11, 19)}</h1>
  );
};

export default Timer;
