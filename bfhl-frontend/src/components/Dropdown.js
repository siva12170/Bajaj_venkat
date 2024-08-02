// src/components/Dropdown.js
import React from 'react';

function Dropdown({ options, selectedOptions, onChange }) {
  return (
    <select
      multiple={true}
      value={selectedOptions}
      onChange={onChange}
      className="dropdown"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
