import { useState } from "react"

export default function Player({player,symbol,isActive,onNameChange}){
    const [name,setName] = useState(player);
    const [ isEditing,setIsEditing ] =useState(false);

    function handleEditing()
    {
        setIsEditing(editing=>!editing);
        if(isEditing){
            onNameChange(symbol,name);
        }
    }

    return (
        <li className={isActive?'active':''}>
            <span className="player" >
            {/* <input type="text" value={name} onChange={(value)=>setName(value)}></input> */}
            {!isEditing ? <span className="player-name">{name} </span>:
            <input type="text" placeholder={name} onChange={(event)=>setName(event.target.value)}/>}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing?'Save':'Edit'}</button>
        </li>
    )
}