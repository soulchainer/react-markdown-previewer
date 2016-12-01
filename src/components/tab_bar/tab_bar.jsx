import React from 'react';

import Tab from '../tab/tab';

const TabBar = function TabBar() {
  return (
    <nav className="TabBar">
      <Tab className="Tab" label="Editor" />
      <Tab className="Tab" label="Preview" />
    </nav>
  );
};

export default TabBar;
