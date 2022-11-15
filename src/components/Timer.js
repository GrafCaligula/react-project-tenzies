/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export default function Timer(props) {
  const [timerOn, setTimerOn] = React.useState(props.timerStart);
  const [time, setTime] = React.useState(0);

  // console.log(timerOn + "   " + props.timerStart)
  

  React.useEffect(() => {
    startCount()
    
  },[])

  function startCount() {
    setInterval(count, 1000);
  }

  function count() {
    setTime((prevTime) => prevTime + 1);
  }

  return <div className="timer">{`Time: ${time}`}</div>;
}
