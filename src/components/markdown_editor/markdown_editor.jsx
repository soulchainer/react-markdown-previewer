import React from 'react';
import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';

import './_styles/markdown_editor.scss';

class MarkdownEditor extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'editor';
  }

  render() {
    return (
      <textarea
        className="MarkdownEditor" cols="80"
        onChange={event => this.props.onContentChange(event.target.value)}
        onMouseEnter={() => this.props.onMouseEnter()}
        onScroll={event => this.props.onScrollChange(event.target)}
        defaultValue={this.props.markdown}
        ref={(node) => { this.node = node; }}
      />
    );
  }
}

export default MarkdownEditor;
