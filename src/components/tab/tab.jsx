import React from 'react';

const Tab = ({label}) => {
  return (
    <button value={label}>{label}</button>
  );
};

export default Tab;