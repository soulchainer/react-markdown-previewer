import React from 'react';

import './markdown_editor.scss';

const MarkdownEditor = ({markdown, onContentChange}) => {
  return (
    <textarea
      className="MarkdownEditor" cols="80"
      onChange={event => onContentChange(event.target.value)}
      defaultValue={markdown}
    />
  );
};

export default MarkdownEditor;