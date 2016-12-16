import React from 'react';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';
import tasklist from 'markdown-it-task-checkbox';
import hljs from 'highlight'; // eslint-disable-line import/no-extraneous-dependencies


import MarkdownScrollbox from '../markdown_scrollbox/markdown_scrollbox';

import './_styles/markdown_preview.scss';

class MarkdownPreview extends MarkdownScrollbox {
  constructor(props) {
    super(props);
    this.name = 'preview';
  }

  render() {
    // Actual default values
    const md = MarkdownIt({
      linkify: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
          } catch (__) {
            return '';
          }
        }

        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
      },
    })
    .use(tasklist, {
      disabled: true,
      divWrap: false,
      divClass: 'checkbox',
      idPrefix: 'cbx_',
      ulClass: 'task-list',
      liClass: 'task-list-item',
    })
    .use(footnote)
    .use(emoji);

    const processedMarkdown = md.render(this.props.markdown);
    const html = { __html: processedMarkdown };
    return (
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML={html} // eslint-disable-line react/no-danger
        onMouseEnter={() => this.props.onMouseEnter()}
        onScroll={event => this.props.onScrollChange(event.target)}
        ref={(node) => { this.node = node; }}
      />
    );
  }
}

export default MarkdownPreview;
