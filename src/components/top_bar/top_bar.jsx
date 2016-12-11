import React, { PropTypes } from 'react';

import ButtonList from '../button_list/button_list';
import Button from '../button/button';

import { buttonList } from '../../utils/buttonActions';
import './_styles/top_bar.scss';

const TopBar = function TopBar(props) {
  const buttons = buttonList.map(action =>
    <Button
      action={action}
      key={action}
      togglePendingAction={props.togglePendingAction}
    />,
  );

  return (
    <header className="TopBar">
      <ButtonList>
        {buttons}
      </ButtonList>
    </header>
  );
};

TopBar.propTypes = {
  togglePendingAction: PropTypes.func.isRequired,
};

export default TopBar;
