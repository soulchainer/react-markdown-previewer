import React, { PropTypes } from 'react';

import ButtonList from '../button_list/button_list';
import Button from '../button/button';

import './_styles/top_bar.scss';

const TopBar = function TopBar(props) {
  return (
    <header className="TopBar">
      <ButtonList>
        <Button
          action="clear"
          togglePendingAction={props.togglePendingAction}
        />
      </ButtonList>
    </header>
  );
};

TopBar.propTypes = {
  togglePendingAction: PropTypes.func.isRequired,
};

export default TopBar;
