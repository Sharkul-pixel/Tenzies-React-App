import React from "react";

export default function Die(props) {

    return (
        <div className={`die-layout ${props.isHeld ? "selected-dice" : ""}`}
        onClick={props.onHold}>    {/* onClick={() => {props.onHold(props.id)}} --> Invoking the function call, new method doesn't*/}
           <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
// "() =>" waits for the click before onHold function to be executed, otherwise function would run instantly