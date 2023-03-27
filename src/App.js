import React, { useState, useEffect } from 'react';
import { PianoRoll } from './components/PianoRoll/PianoRoll';
import { Menu } from './components/Menu/Menu';
import './App.css';

function App() {
  const [pianoRollDimensions, setPianoRollDimensions] = useState({
    width: 480,
    height: 640,
  });
  const [pianoRollVisible, setPiantRollVisible] = useState(true);

  const togglepianoRoll = () => {
    setPiantRollVisible(!pianoRollVisible);
  };

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Menu 
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '50px',
          width: '100%',
          backgroundColor: '#8787A3',
        }}
        togglePianoRoll={togglepianoRoll}
      />

      <PianoRoll 
        dimensions={pianoRollDimensions} 
        setDimensions={setPianoRollDimensions} 
        visible={pianoRollVisible} 
        setVisible={setPiantRollVisible}
      />
    </div>
  );
}

export default App;
