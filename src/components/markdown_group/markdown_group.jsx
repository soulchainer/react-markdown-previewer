import _ from 'lodash';
import React from 'react';

import MarkdownEditor from '../markdown_editor/markdown_editor.jsx';
import MarkdownPreview from '../markdown_preview/markdown_preview.jsx';

import readme from '../../../static/doc/README.md';
import './markdown_group.scss';

class MarkdownGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: `${readme}`,
      // percentage of content scrolled in each element
      syncedScroll: {editor: 0, preview: 0},
      // box to be autoscrolled, to be in sync with the one being scrolled
      autoScrolledView: null
    };
  }

  onScrollChange() {
    let _onScrollChange = el => {
      let totalToScroll = el.scrollHeight  - el.clientHeight;
      let scrollPercent = Math.round(el.scrollTop * 100 / totalToScroll);
      let syncedScroll = {editor: scrollPercent, preview: scrollPercent};
      this.setState({syncedScroll});
    };
    return _.debounce(el => _onScrollChange(el), 300);
  }

  render() {
    return (
      <div className="MarkdownGroup">
        <MarkdownEditor
          markdown={this.state.markdown}
          onContentChange={markdown => this.setState({markdown})}
          onMouseEnter={() => this.setState({autoScrolledView: 'preview'})}
          onScrollChange={ this.onScrollChange() }
          autoScrolledView={this.state.autoScrolledView}
          syncedScroll={this.state.syncedScroll} />
        <MarkdownPreview
          markdown={this.state.markdown}
          onMouseEnter={() => this.setState({autoScrolledView: 'editor'})}
          onScrollChange={ this.onScrollChange() }
          autoScrolledView={this.state.autoScrolledView}
          syncedScroll={this.state.syncedScroll} />
      </div>
    );
  }
}

export default MarkdownGroup;