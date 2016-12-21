import { debounce } from 'lodash';
import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';

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
    this.editor.node.selectionStart = 0;
    this.editor.node.selectionEnd = 0;
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
      selectText(this.editor.node, this.contentSelection);
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
    const editor = (
      <MarkdownEditor
        markdown={this.state.markdown}
        onContentChange={markdown => this.setState({ markdown })}
        onMouseEnter={() => this.setState({ autoScrolledView: 'preview' })}
        onScrollChange={this.onScrollChange()}
        autoScrolledView={this.state.autoScrolledView}
        syncedScroll={this.state.syncedScroll}
        ref={(node) => { this.editor = node; }}
      />
    );
    const preview = (
      <MarkdownPreview
        markdown={this.state.markdown}
        onMouseEnter={() => this.setState({ autoScrolledView: 'editor' })}
        onScrollChange={this.onScrollChange()}
        autoScrolledView={this.state.autoScrolledView}
        syncedScroll={this.state.syncedScroll}
      />
    );

    return (
      <MediaQuery maxWidth={800}>
        {(matches) => {
          if (matches) {
            return (
              <SwipeableViews
                className="MarkdownGroup"
                index={this.props.actualSlide}
                onChangeIndex={() => this.props.toggleActualSlide()}
              >
                {editor}
                {preview}
              </SwipeableViews>
            );
          }
          return (
            <div className="MarkdownGroup">
              {editor}
              {preview}
            </div>
          );
        }}
      </MediaQuery>
    );
  }
}

MarkdownGroup.propTypes = {
  actualSlide: PropTypes.number.isRequired,
  clearMarkdownChangedFromModal: PropTypes.func.isRequired,
  toggleActualSlide: PropTypes.func.isRequired,
};

export default MarkdownGroup;
