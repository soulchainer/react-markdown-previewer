import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';

import TopBar from './components/top_bar/top_bar';
import MarkdownGroup from './components/markdown_group/markdown_group';
import ModalDialog from './components/modal_dialog/modal_dialog';

import './_styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingAction: '',
      editor: null,
      markdownChangedFromModal: '',
    };
  }

  togglePendingAction(action) {
    this.setState({ pendingAction: (this.state.pendingAction) ? '' : action });
  }

  renderModalDialog(action) {
    const fields = {
      image: [
        { id: 'image-url', label: 'URL' },
        { id: 'image-text', label: 'Alt text' },
      ],
      link: [
        { id: 'link-url', label: 'URL' },
        { id: 'link-text', label: 'Text' },
      ],
    };
    const modalDialog = actionName =>
      <div key={action}>
        <ModalDialog
          fields={fields[actionName]}
          action={actionName}
          title={actionName[0].toUpperCase() + actionName.slice(1)}
          closeModal={() => this.togglePendingAction(actionName)}
          editor={this.state.editor}
          editorContainer={this.node}
          onMarkdownChangeFromModal={markdown => this.setState({
            markdownChangedFromModal: markdown,
          })}
        />
      </div>
    ;
    const emptyBlock = <div />;

    return (fields[action]) ? modalDialog(action) : emptyBlock;
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="ModalDialog"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={100}
        >
          {this.renderModalDialog(this.state.pendingAction)}
        </ReactCSSTransitionGroup>
        <TopBar
          togglePendingAction={action => this.togglePendingAction(action)}
        />
        <MarkdownGroup
          pendingAction={this.state.pendingAction}
          togglePendingAction={action => this.togglePendingAction(action)}
          getEditorRef={ref => this.setState({ editor: ref })}
          ref={(node) => { this.node = node; }}
          markdownChangedFromModal={this.state.markdownChangedFromModal}
          clearMarkdownChangedFromModal={() => this.setState({ markdownChangedFromModal: '' })}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#container'));
