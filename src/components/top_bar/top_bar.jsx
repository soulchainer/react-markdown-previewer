import React from 'react';

import ButtonList from '../button_list/button_list';
import Button from '../button/button';

import './_styles/top_bar.scss';

const TopBar = function TopBar() {
  return (
    <header className="TopBar">
      <ButtonList>
        <Button func="clear" />
      </ButtonList>
    </header>
  );
};

export default TopBar;
