import React, { useState, useEffect } from "react";

export function Wrapper({ children }) {
  const [dimensions, setDimensions] = useState({ width: 480, height: 640 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const duringDrag = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const endDrag = () => {
    setDragging(false);
  };

  const startResize = (e) => {
    e.stopPropagation();
    setResizing(true);
    setOffset({ x: e.clientX, y: e.clientY });
  };

  const duringResize = (e) => {
    if (!resizing) return;
    const newWidth = dimensions.width + (e.clientX - offset.x);
    const newHeight = dimensions.height + (e.clientY - offset.y);
    setDimensions({ width: newWidth, height: newHeight });
    setOffset({ x: e.clientX, y: e.clientY });
  };

  const endResize = () => {
    setResizing(false);
  };

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
      }}
    >
      <div
        className="container-header"
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "lightgrey",
          cursor: "move",
        }}
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <div className="container-title">{children.title}</div>
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
