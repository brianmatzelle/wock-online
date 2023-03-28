import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function MenuButton({ type }) {
  const [show, setShow] = useState(false);
  const itemStyle = {
    backgroundColor: 'lightgray',
  };
  const itemContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const handleToggle = (isOpen, e, metadata) => {
    if (metadata.source === 'select') {
      setShow(false);
    }
  };

  const getMenuTitle = () => {
    switch (type) {
      case 'file':
        return 'File';
      case 'edit':
        return 'Edit';
      case 'view':
        return 'View';
      case 'help':
        return 'Help';
      default:
        return `ERROR: Invalid MenuButton type: ${type}`;
    }
  };

  const renderMenuItems = () => {
    switch (type) {
      case 'file':
        return (
          <>
            { show &&
            <div style={itemContainerStyle} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <Dropdown.Item style={itemStyle}>New</Dropdown.Item>
              <Dropdown.Item style={itemStyle}>Open</Dropdown.Item>
              <Dropdown.Item style={itemStyle}>Save</Dropdown.Item>
            </div>
            }
          </>
        );
      case 'edit':
        return (
          <>
            { show && 
            <div style={itemContainerStyle} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <Dropdown.Item>Undo</Dropdown.Item>
              <Dropdown.Item>Redo</Dropdown.Item>
              <Dropdown.Item>Cut</Dropdown.Item>
              <Dropdown.Item>Copy</Dropdown.Item>
              <Dropdown.Item>Paste</Dropdown.Item>
            </div>
            }
          </>
        );
      case 'view':
        return (
          <>
          { show &&
            <div style={itemContainerStyle} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <Dropdown.Item>Zoom In</Dropdown.Item>
              <Dropdown.Item>Zoom Out</Dropdown.Item>
              <Dropdown.Item>Reset Zoom</Dropdown.Item>
            </div>
          }
          </>
        );
      case 'help':
        return (
          <>
          { show &&
            <div style={itemContainerStyle} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <Dropdown.Item>About</Dropdown.Item>
              <Dropdown.Item>Documentation</Dropdown.Item>
            </div>
          }
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dropdown
      show={show}
      onToggle={handleToggle}
    >
      <Dropdown.Toggle
        variant="light"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {getMenuTitle()}
      </Dropdown.Toggle>
      <Dropdown.Menu>{renderMenuItems()}</Dropdown.Menu>
    </Dropdown>
  );
}
