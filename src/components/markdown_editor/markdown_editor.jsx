import React from 'react';
import ReactDOM from 'react-dom';

import './markdown_editor.scss';

class MarkdownEditor extends React.Component {
  updateScroll(scrollPercent) {
    let totalToScroll = this.el.scrollHeight  - this.el.clientHeight;
    let scrollTo = Math.round((totalToScroll * scrollPercent) / 100);
    this.el.scrollTop = scrollTo;
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrolledView != 'editor') {
      this.updateScroll(nextProps.scrolledPercent.editor);
    }
  }

  render() {
    return (
      <textarea
        className="MarkdownEditor" cols="80"
        onChange={event => this.props.onContentChange(event.target.value)}
        onScroll={event => this.props.onScrollChange(event.target)}
        defaultValue={this.props.markdown}
      />
    );
  }


}

export default MarkdownEditor;