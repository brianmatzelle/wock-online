import React from 'react';
import MenuButton from './MenuButton';

export function Menu({ style, togglePianoRoll }) {
  const menus = ['file', 'edit', 'view', 'help'];
  return (
    <div className="menu" style={style}>
      {menus.map(button => (
        <MenuButton key={button} type={button} />
      ))}
      <button onClick={togglePianoRoll}>Piano Roll</button>
    </div>
  );
}