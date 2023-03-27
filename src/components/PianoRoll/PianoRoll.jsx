import React, { useState } from 'react';
import { Wrapper } from '../Wrapper';
import { VariableSizeGrid as Grid } from 'react-window';
import { Keys } from './Keys';
import './PianoRoll.css';

export function PianoRoll({ dimensions, setDimensions, visible, setVisible }) {
  const containerId = {
    id: 'piano-roll',
    title: 'Piano Roll',
  };

  const numberOfRows = 88;
  const numberOfColumns = 128;

  const cellWidth = 40;
  const cellHeight = 25;

  const [cellColors, setCellColors] = useState(
    new Array(numberOfRows).fill(null).map(() => new Array(numberOfColumns).fill('white'))
  );

  const toggleCellColor = (rowIndex, columnIndex) => {
    const newCellColors = cellColors.map(row => [...row]);
    newCellColors[rowIndex][columnIndex] =
      cellColors[rowIndex][columnIndex] === 'white' ? 'blue' : 'white';
    setCellColors(newCellColors);
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    return (
      <div
        onClick={() => toggleCellColor(rowIndex, columnIndex)}
        style={{
          ...style,
          width: cellWidth - 1, // Adjust for border
          height: cellHeight - 1, // Adjust for border
          border: '1px solid lightgray',
          backgroundColor: cellColors[rowIndex][columnIndex],
        }}
      ></div>
    );
  };

  return (
    <>
    {visible && <Wrapper 
    containerId={containerId} 
    dimensions={dimensions} 
    setDimensions={setDimensions}
    setVisible={setVisible}
    >
      <div
        className="piano-roll"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        <Keys dimensions={dimensions} />
        <Grid
          className="piano-roll-grid"
          columnCount={numberOfColumns}
          columnWidth={() => cellWidth}
          height={dimensions.height - 25} // - 25 for wrapper's header height
          rowCount={numberOfRows}
          rowHeight={() => cellHeight}
          width={dimensions.width - 70} // - 70 for keys' width
        >
          {Cell}
        </Grid>
      </div>
    </Wrapper>
    }
    </>
  );
}
