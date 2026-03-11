import { useState } from "react";

export default function Log({turns}){

    // const [info,setInfo]=useState([])
    // for(const turn of turns){
    //     s
    // }
    return (
    <ol id="log">
        {turns.map(turn=>(
            <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>
        ))}
    </ol>
    );
}
   