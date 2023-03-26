import React, { useState, useEffect } from 'react';
import { PianoRoll } from './components/PianoRoll/PianoRoll';
import './App.css';

function App() {
  const [pianoRollDimensions, setPianoRollDimensions] = useState({
    width: 480,
    height: 640,
  });

  return (
    <div className="App">
      <PianoRoll dimensions={pianoRollDimensions} setDimensions={setPianoRollDimensions}/>
    </div>
  );
}

export default App;
