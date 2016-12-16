import { debounce } from 'lodash';
import React, { Component, PropTypes } from 'react';

import MarkdownEditor from '../markdown_editor/markdown_editor';
import MarkdownPreview from '../markdown_preview/markdown_preview';

import ButtonAction, { selectText } from '../../utils/buttonActions';
import readme from '../../../static/doc/README.md';
import './_styles/markdown_group.scss';

class MarkdownGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: readme,
      // percentage of content scrolled in each element
      syncedScroll: { editor: 0, preview: 0 },
      // box to be autoscrolled, to be in sync with the one being scrolled
      autoScrolledView: null,
    };
    this.contentSelection = null;
  }

  componentDidMount() {
    this.node.node.selectionStart = 0;
    this.node.node.selectionEnd = 0;
    this.props.getEditorRef(this.node);
  }

  componentWillReceiveProps(nextProps) {
    const pendingAction = nextProps.pendingAction;
    const markdown = nextProps.markdownChangedFromModal;
    if (pendingAction) {
      this.contentSelection = ButtonAction(this, pendingAction);
    }
    if (markdown) {
      this.setState({ markdown });
      this.props.clearMarkdownChangedFromModal();
    }
  }

  componentDidUpdate(previousProps, previousState) { // eslint-disable-line
    if (this.contentSelection) {
      selectText(this.node.node, this.contentSelection);
      this.contentSelection = null;
    }
  }

  onScrollChange() {
    const scrollChange = (el) => {
      const totalToScroll = el.scrollHeight - el.clientHeight;
      const scrollPercent = Math.round((el.scrollTop * 100) / totalToScroll);
      const syncedScroll = { editor: scrollPercent, preview: scrollPercent };
      this.setState({ syncedScroll });
    };
    return debounce(el => scrollChange(el), 300);
  }

  render() {
    return (
      <div className="MarkdownGroup">
        <MarkdownEditor
          markdown={this.state.markdown}
          onContentChange={markdown => this.setState({ markdown })}
          onMouseEnter={() => this.setState({ autoScrolledView: 'preview' })}
          onScrollChange={this.onScrollChange()}
          autoScrolledView={this.state.autoScrolledView}
          syncedScroll={this.state.syncedScroll}
          ref={(node) => { this.node = node; }}
        />
        <MarkdownPreview
          markdown={this.state.markdown}
          onMouseEnter={() => this.setState({ autoScrolledView: 'editor' })}
          onScrollChange={this.onScrollChange()}
          autoScrolledView={this.state.autoScrolledView}
          syncedScroll={this.state.syncedScroll}
        />
      </div>
    );
  }
}

MarkdownGroup.propTypes = {
  getEditorRef: PropTypes.func.isRequired,
  clearMarkdownChangedFromModal: PropTypes.func.isRequired,
};

export default MarkdownGroup;
