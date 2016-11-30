import React from 'react';
import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';
//import hljs from '../../../static/lib/highlight/index.js';
import * as MarkdownIt from 'markdown-it';

import './markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  highlightCode(htmlElement) {
    let codeBlocks = htmlElement.content.querySelectorAll('pre>code');
    for (let block of codeBlocks) {
      //hljs.highlightBlock(block);
    }
    return htmlElement;
  }

  render() {
    //let processedMarkdown = MarkdownIt(this.props.markdown);
    let processedMarkdown = this.props.markdown;
    let htmlElement = document.createElement('template');
    htmlElement.innerHTML = processedMarkdown;

    htmlElement = this.highlightCode(htmlElement);

    let html = {__html: htmlElement.innerHTML};
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