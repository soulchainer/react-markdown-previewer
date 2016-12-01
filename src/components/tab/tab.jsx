import React from 'react';

const Tab = function Tab({ label }) {
  return (
    <button value={label}>{label}</button>
  );
};

Tab.propTypes = {
  label: React.PropTypes.string.isRequired,
};

export default Tab;
