import React from 'react';
import * as MarkdownIt from 'markdown-it';
import hljs from 'highlight'; // eslint-disable-line import/no-extraneous-dependencies

import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';

import './_styles/markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  highlightCode(htmlElement) {
    const codeBlocks = htmlElement.content.querySelectorAll('pre>code');
    for (let block of codeBlocks) {
      // hljs.highlightBlock(block);
    }
    return htmlElement;
  }

  render() {
    // let processedMarkdown = MarkdownIt(this.props.markdown);
    const processedMarkdown = this.props.markdown;
    let htmlElement = document.createElement('template');
    htmlElement.innerHTML = processedMarkdown;

    htmlElement = this.highlightCode(htmlElement);

    const html = { __html: htmlElement.innerHTML };
    return (
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML={html}
        onMouseEnter={() => this.props.onMouseEnter()}
        onScroll={event => this.props.onScrollChange(event.target)}
      />
    );
  }
}

export default MarkdownPreview;
