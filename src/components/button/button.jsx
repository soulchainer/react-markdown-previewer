import React, { PropTypes } from 'react';

import './_styles/button.scss';

const Button = function Button(props) {
  const options = {
    clear: this.clearEditor,
  };

  return (
    <button
      className="Button"
      onClick={() => options[props.func]()}
    >
      <span>{props.func}</span>
    </button>
  );
};

Button.propTypes = {
  func: PropTypes.string.isRequired,
};
export default Button;
