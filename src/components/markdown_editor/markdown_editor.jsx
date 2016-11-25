import React from 'react';
import ReactDOM from 'react-dom';

import './markdown_editor.scss';

class MarkdownEditor extends React.Component {
  animateScroll(position, duration) {
    const startPoint = this.el.scrollTop;
    let distance = Math.abs(position - startPoint); // distance to cover
    const frames = (duration * 24) / 1000; // 24 fps
    const timeStep = 1000/24; // duration of every frame
    const direction = (position > startPoint)? 1 : -1; // -1 for upwards
    const scrollStep = distance/frames; // distance by frame
    const scrollInterval = setInterval(() => {
      if (distance > scrollStep) {
        this.el.scrollTop += scrollStep * direction;
        distance -= scrollStep;
      } else {
        this.el.scrollTop += distance * direction;
        clearInterval(scrollInterval);
      }
    }, timeStep);
  }

  updateScroll(scrollPercent) {
    let totalScrollLength = this.el.scrollHeight  - this.el.clientHeight;
    let scrollTo = (totalScrollLength * scrollPercent) / 100;
    console.log("scrollTo: " + scrollTo);
    console.log(this.props.scrolledPercent);
    console.log("Editor update " + scrollPercent);
    this.animateScroll(scrollTo, 300);
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoScrolledView === 'editor') {
      this.updateScroll(nextProps.scrolledPercent.preview);
    }
  }

  render() {
    return (
      <textarea
        className="MarkdownEditor" cols="80"
        onChange={event => this.props.onContentChange(event.target.value)}
        onMouseEnter={() => this.props.onMouseEnter() }
        onScroll={event => this.props.onScrollChange(event.target)}
        defaultValue={this.props.markdown}
      />
    );
  }


}

export default MarkdownEditor;