import _ from 'lodash';
import React from 'react';
import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';
import hljs from 'highlight.js';
import marked from 'marked';

import './markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  highlightCode(htmlElement) {
    let codeBlocks = htmlElement.content.querySelectorAll('pre>code');
    for (let block of codeBlocks) {
      hljs.highlightBlock(block);
    }
    return htmlElement;
  }

  render() {
    let processedMarkdown = marked(this.props.markdown);
    let htmlElement = document.createElement('template');
    htmlElement.innerHTML = processedMarkdown;

    htmlElement = this.highlightCode(htmlElement);

    let html = {__html: marked(htmlElement.innerHTML)};
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