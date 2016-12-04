import React from 'react';
import ReactDOM from 'react-dom';

import TopBar from './components/top_bar/top_bar';
import MarkdownGroup from './components/markdown_group/markdown_group';

require('../static/html/index.html');
require('./_styles/reset.scss');
require('./_styles/variables.scss');

const App = function App() {
  return (
    <div>
      <TopBar />
      <MarkdownGroup />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#container'));
