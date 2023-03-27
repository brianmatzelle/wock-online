import React from 'react';
import MenuButton from './MenuButton';

export function Menu({ style }) {
  const buttons = ['file', 'edit', 'view', 'help'];
  return (
    <div className="menu" style={style}>
      {buttons.map(button => (
        <MenuButton key={button} type={button} />
      ))}
    </div>
  );
}