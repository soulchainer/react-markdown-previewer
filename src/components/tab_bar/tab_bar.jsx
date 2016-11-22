import React from 'react';

import Tab from '../tab/tab.jsx';

const TabBar = () => {
  return (
    <nav className="TabBar">
      <Tab className="Tab" label="Editor"/>
      <Tab className="Tab" label="Preview" />
    </nav>
  );
};

export default TabBar;