import React, { PropTypes } from 'react';

import './_styles/button.scss';

const Button = function Button(props) {
  return (
    <button
      className="Button"
      onClick={() => props.togglePendingAction(props.action)}
    >
      <span className={`icon-${props.action}`} />
    </button>
  );
};

Button.propTypes = {
  action: PropTypes.string.isRequired,
  togglePendingAction: PropTypes.func.isRequired,
};

export default Button;
