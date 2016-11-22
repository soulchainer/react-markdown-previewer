import React from 'react';
import marked from 'marked';

import './markdown_preview.scss';

const MarkdownPreview = ({markdown}) => {
  let html = {__html: marked(markdown)};

  return (
    <div className="MarkdownPreview" dangerouslySetInnerHTML= {html} />
  );
};

export default MarkdownPreview;