import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function MenuButton({ type }) {
  const [show, setShow] = useState(false);

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
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Save</Dropdown.Item>
          </>
        );
      case 'edit':
        return (
          <>
            <Dropdown.Item>Undo</Dropdown.Item>
            <Dropdown.Item>Redo</Dropdown.Item>
            <Dropdown.Item>Cut</Dropdown.Item>
            <Dropdown.Item>Copy</Dropdown.Item>
            <Dropdown.Item>Paste</Dropdown.Item>
          </>
        );
      case 'view':
        return (
          <>
            <Dropdown.Item>Zoom In</Dropdown.Item>
            <Dropdown.Item>Zoom Out</Dropdown.Item>
            <Dropdown.Item>Reset Zoom</Dropdown.Item>
          </>
        );
      case 'help':
        return (
          <>
            <Dropdown.Item>About</Dropdown.Item>
            <Dropdown.Item>Documentation</Dropdown.Item>
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
