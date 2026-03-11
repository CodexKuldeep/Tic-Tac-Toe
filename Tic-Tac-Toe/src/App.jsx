import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react";
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currPlayer = 'X';

      if(gameTurns.length>0 && gameTurns[0].player === 'X')
      {
        currPlayer='O';
      }

      return currPlayer;
}

function App() {
 // const [activePlayer,setActivePlayer]= useState('X');
  const [gameTurns,setGameTurns] = useState([]);
  const [players,setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(arr=>[...arr])];

    for(const turn of gameTurns)
    {
        const {square , player}= turn;
        const {row ,col } = square;

        gameBoard[row][col]=player;
    }

    let winner=null;
    let hasDraw = gameTurns.length===9;

    for(const combination of WINNING_COMBINATIONS)
    {
      const firstSqureSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSqureSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSqureSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSqureSymbol && firstSqureSymbol===secondSqureSymbol && firstSqureSymbol===thirdSqureSymbol){
        winner=players[firstSqureSymbol];
      }
    }

    function handleChangeName(symbol,newName){
      setPlayers(prevName=> {
        return {
          ...prevName,
          [symbol]:newName
        }
      })
    }
    function handleRestart(){
      setGameTurns([]);
    }

  function handleSelectSquare(rowIndex,colIndex){

    setGameTurns((prevTurn) => {
     let currPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [{square : {row:rowIndex,col:colIndex}, player:currPlayer },
        ...prevTurn];
        return updatedTurn;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player player="Player 1" symbol='X' isActive={activePlayer==='X'} onNameChange={handleChangeName}/>
          <Player player="Player 2" symbol='O' isActive={activePlayer==='O'} onNameChange={handleChangeName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelectRestart={handleRestart} />}
        <GameBoard 
        onSelectSquare={handleSelectSquare}
        board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
