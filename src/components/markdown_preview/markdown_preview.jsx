import React from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight'; // eslint-disable-line import/no-extraneous-dependencies

import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';

import './_styles/markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  /*
  highlightCode(htmlElement) {
    const codeBlocks = htmlElement.content.querySelectorAll('pre>code');
    codeBlocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
    return htmlElement;
  }
  */

  render() {
    // const processedMarkdown = MarkdownIt(this.props.markdown);
    // let htmlElement = document.createElement('template');
    // htmlElement.innerHTML = processedMarkdown;

    // htmlElement = this.highlightCode(htmlElement);

    // Actual default values
    const md = MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {
            return '';
          }
        }

        return ''; // use external default escaping
      },
    });

    const processedMarkdown = md.render(this.props.markdown);

    // const html = { __html: htmlElement.innerHTML };
    const html = { __html: processedMarkdown };
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
