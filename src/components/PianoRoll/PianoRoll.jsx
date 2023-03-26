import React from 'react';
import { Wrapper } from '../Wrapper';

export function PianoRoll() {
  const containerId = {
    id: 'piano-roll',
    title: 'Piano Roll'
  }
  return (
    <Wrapper>
      <div className="piano-roll" style={{ width: "100% ", height: '100%'}}>
        Hey
      </div>
    </Wrapper>
  );
}