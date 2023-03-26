import React, { useState, useEffect } from 'react';
import { PianoRoll } from './components/PianoRoll/PianoRoll';
import './App.css';

const NUM_ROWS = 12;
const NUM_COLS = 16;
const BASE_FREQUENCY = 440; // A4 frequency

const noteFrequencies = Array.from({ length: NUM_ROWS }, (_, i) =>
  BASE_FREQUENCY * Math.pow(2, (i - 9) / 12)
);

const PianoRollOld = () => {
  const [notes, setNotes] = useState(Array(NUM_ROWS).fill(Array(NUM_COLS).fill(false)));
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
  }, [audioContext]);

  const playNote = (frequency) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleNote = (row, col) => {
    const newNotes = notes.map((noteRow, r) =>
      noteRow.map((note, c) => (r === row && c === col ? !note : note))
    );
    setNotes(newNotes);

    if (!notes[row][col]) {
      playNote(noteFrequencies[row]);
    }
  };

  return (
    <div className="piano-roll">
      {notes.map((noteRow, row) => (
        <div key={row} className="piano-row">
          {noteRow.map((note, col) => (
            <div
              key={col}
              className={`piano-cell${note ? ' active' : ''}`}
              onClick={() => toggleNote(row, col)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PianoRoll />
    </div>
  );
}

export default App;
