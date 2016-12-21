import React, { PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import ButtonList from '../button_list/button_list';
import Button from '../button/button';

import { buttonGroups } from '../../utils/buttonActions';
import './_styles/top_bar.scss';

const TopBar = function TopBar(props) {
  const listButtonGroup = buttonGroup =>
    buttonGroup.map(button =>
      <Button
        action={button}
        key={button}
        togglePendingAction={props.togglePendingAction}
      />,
    );

  const buttons = [...buttonGroups.keys()].map(buttonGroupName =>
    <ButtonList key={buttonGroupName}>
      {listButtonGroup(buttonGroups.get(buttonGroupName))}
    </ButtonList>,
  );

  const horizontalScroll = (event) => {
    event.preventDefault();
    const movement = event.deltaY * 10;
    const bar = event.currentTarget;
    const minScroll = bar.scrollLeft;
    const maxScroll = bar.scrollLeftMax;
    if ((movement > 0 && maxScroll !== minScroll) || (movement < 0 && maxScroll)) {
      bar.scrollLeft += movement;
    }
  };

  return (
    <header
      className="TopBar"
      onWheel={horizontalScroll}
    >
      <MediaQuery maxWidth={800}>
        <ButtonList>
          <button
            className={`Button icon-${props.nextSlide}`}
            onClick={() => props.toggleActualSlide()}
          />
        </ButtonList>
      </MediaQuery>
      {buttons}
      <div className="fade-limits" />
    </header>
  );
};

TopBar.propTypes = {
  nextSlide: PropTypes.string.isRequired,
  toggleActualSlide: PropTypes.func.isRequired,
};

export default TopBar;
