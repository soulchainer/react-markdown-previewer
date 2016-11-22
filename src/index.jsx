import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/reset.scss';
import '../styles/variables.scss';

import TopBar from './components/top_bar/top_bar.jsx';
import MarkdownGroup from './components/markdown_group/markdown_group.jsx';

const App = () => {
  return (
    <div>
      <TopBar />
      <MarkdownGroup />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#container'));