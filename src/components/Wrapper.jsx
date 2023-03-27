import React, { useState, useEffect } from "react";

export function Wrapper({ 
  children, 
  setVisible, 
  containerId, 
  dimensions, 
  setDimensions 
}) {
  const [position, setPosition] = useState({ x: 50, y: 80 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);

  const startDrag = (e) => {
    if (maximized) return;
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const duringDrag = (e) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
  
    // Check screen bounds
    const minX = 0;
    const minY = 50;  // 50 for header height
    const maxX = window.innerWidth - dimensions.width;
    const maxY = window.innerHeight - dimensions.height;
  
    const boundedX = Math.min(Math.max(minX, newX), maxX);
    const boundedY = Math.min(Math.max(minY, newY), maxY);
  
    setPosition({ x: boundedX, y: boundedY });
  };
  

  const endDrag = () => {
    setDragging(false);
  };

  const startResize = (e) => {
    if (maximized) return;
    e.stopPropagation();
    setResizing(true);
    setOffset({ x: e.clientX, y: e.clientY });
  };
  

  const duringResize = (e) => {
    if (!resizing) return;
    const newWidth = Math.max(440, dimensions.width + (e.clientX - offset.x));
    const newHeight = Math.max(440, dimensions.height + (e.clientY - offset.y));
    setDimensions({ width: newWidth, height: newHeight });
    setOffset({ x: e.clientX, y: e.clientY });
  };  

  const endResize = () => {
    setResizing(false);
  };

  const minimize = () => {
    setDimensions({ ...dimensions, height: 20 });
  };

  const maximize = () => {
    setMaximized(!maximized);
    if (!maximized) {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    } else {
      setDimensions({ width: 480, height: 640 });
      setPosition({ x: 100, y: 100 });
    }
  };

  const exit = () => {
    // Perform the exit functionality, such as removing the component from the DOM
    setVisible(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", duringDrag);
      window.addEventListener("mouseup", endDrag);
    }
    return () => {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [dragging]);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", duringResize);
      window.addEventListener("mouseup", endResize);
    }
    return () => {
      window.removeEventListener("mousemove", duringResize);
      window.removeEventListener("mouseup", endResize);
    };
  }, [resizing]);

  const buttonStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "lightgrey",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "12px",
    lineHeight: "12px",
    fontWeight: "bold",
  };

  return (
    <div
      className="container"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "absolute",
        left: position.x,
        top: position.y,
        boxShadow: "1px 1px 4px 0px #4B0082",
      }}
    >
      <div
        className="container-header"
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#9e8ad5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "grab",
        }}
        onMouseDown={startDrag}
      >
        <div className="container-title" 
        style={{ 
          paddingLeft: '4px', 
          fontFamily: 'Webdings', 
          color: '',
          userSelect: 'none',
        }}>
          {containerId.title}
        </div>
        <div className="window-buttons" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "4px",
        }}>
          <div style={buttonStyle} onClick={minimize}>-</div>
          <div style={buttonStyle} onClick={maximize}>🗖</div>
          <div
            style={{
              ...buttonStyle,
              backgroundColor: "red",
              color: "white",
            }}
            onClick={exit}
          >
            x
          </div>
        </div>
      </div>
      <div className="wrapper">{children}</div>
      <div
        className="resize-handle"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "nwse-resize",
        }}
        onMouseDown={startResize}
      ></div>
    </div>
  );
}

