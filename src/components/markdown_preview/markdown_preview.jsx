import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import './markdown_preview.scss';

class MarkdownPreview extends React.Component {
  updateScroll(scrollPercent) {
    let totalToScroll = this.el.scrollHeight  - this.el.clientHeight;
    let scrollTo = Math.round((totalToScroll * scrollPercent) / 100);
    this.el.scrollTop = scrollTo;
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrolledView != 'preview') {
      this.updateScroll(nextProps.scrolledPercent.preview);
    }
  }

  render() {
    let html = {__html: marked(this.props.markdown)};

    return (
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML= {html}
        onScroll={event => this.props.onScrollChange(event.target)} />
    );
  }
}

export default MarkdownPreview;