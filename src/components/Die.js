import React from "react";

export default function Die(props){

  const styles = {backgroundColor: props.isHeld ? "#59e391" : "#ffffff"};

  return (
    <div className="die" style={styles} onClick={props.holdDie}>{props.value}</div>
  )
}