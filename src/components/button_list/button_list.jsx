import React, { PropTypes } from 'react';

import './_styles/button_list.scss';

const ButtonList = function ButtonList(props) {
  return (
    <span className="ButtonList">
      {props.children}
    </span>
  );
};

ButtonList.propTypes = {
  children: PropTypes.node,
};

export default ButtonList;
