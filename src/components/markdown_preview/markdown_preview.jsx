import React from 'react';
import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';
import marked from 'marked';

import './markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  render() {
    let html = {__html: marked(this.props.markdown)};

    return (
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML= {html}
        onMouseEnter={() => this.props.onMouseEnter() }
        onScroll={event => this.props.onScrollChange(event.target)} />
    );
  }
}

export default MarkdownPreview;