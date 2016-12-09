import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TopBar from './components/top_bar/top_bar';
import MarkdownGroup from './components/markdown_group/markdown_group';

require('./_styles/reset.scss');
require('./_styles/variables.scss');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingAction: '',
    };
  }

  togglePendingAction(action) {
    this.setState({ pendingAction: (this.state.pendingAction) ? '' : action });
  }

  render() {
    return (
      <div>
        <TopBar
          togglePendingAction={action => this.togglePendingAction(action)}
        />
        <MarkdownGroup
          pendingAction={this.state.pendingAction}
          togglePendingAction={action => this.togglePendingAction(action)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#container'));
