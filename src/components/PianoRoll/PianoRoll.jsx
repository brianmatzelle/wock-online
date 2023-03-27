import React from 'react';
import { Wrapper } from '../Wrapper';
import { VariableSizeGrid as Grid } from 'react-window';

export function PianoRoll({ dimensions, setDimensions }) {
  const containerId = {
    id: 'piano-roll',
    title: 'Piano Roll',
  };

  const numberOfRows = 88;
  const numberOfColumns = 128;

  const cellWidth = 40;
  const cellHeight = 25;

  const Cell = ({ columnIndex, rowIndex, style }) => {
    return (
      <div
        style={{
          ...style,
          width: cellWidth - 1, // Adjust for border
          height: cellHeight - 1, // Adjust for border
          border: '1px solid lightgray',
        }}
      ></div>
    );
  };

  return (
    <Wrapper containerId={containerId} dimensions={dimensions} setDimensions={setDimensions}>
      <div
        className="piano-roll"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        {/* <Keys /> */}
        <Grid
          columnCount={numberOfColumns}
          columnWidth={() => cellWidth}
          height={dimensions.height - 25} // Adjust for wrapper's header height
          rowCount={numberOfRows}
          rowHeight={() => cellHeight}
          width={dimensions.width}
        >
          {Cell}
        </Grid>
      </div>
    </Wrapper>
  );
}
