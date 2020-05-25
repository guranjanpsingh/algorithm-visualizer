import React, { useState } from 'react';
import Board from './components/board/board';
import './App.scss';

function App() {
  const boardRef = React.useRef();
  const [ref, setRef] = useState();
  React.useEffect(() => {
    setRef(boardRef);
    console.log(boardRef);
  }, [boardRef])
  return (
    <div className="App" >
      <div className="app-board" ref={boardRef}>
        <Board
          width={ref?.current?.offsetWidth} 
          height={ref?.current?.offsetHeight} />
      </div>
    </div>
  );
}

export default App;
