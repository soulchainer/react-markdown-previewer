import React from 'react';
import ReactDOM from 'react-dom';

import './markdown_editor.scss';

class MarkdownEditor extends React.Component {
  animateScroll(position, duration) {
    const startPoint = this.el.scrollTop;
    const distance = Math.abs(position - startPoint); // total distance to cover
    const frames = (duration * 24) / 1000; // 24 fps
    const direction = (position > startPoint)? 1 : -1; // -1 for upwards
    const scrollStep = Math.round(distance/frames) * direction; // distance by frame
    const timeStep = Math.round(duration / frames); // duration of every frame
    const scrollInterval = setInterval(() => {
      duration -= timeStep;
      if (duration >= timeStep) {
        this.el.scrollTop += scrollStep;  
      } else {
        clearInterval(scrollInterval);
      }
    }, timeStep);
  }

  updateScroll(scrollPercent) {
    let totalScrollLength = this.el.scrollHeight  - this.el.clientHeight;
    let scrollTo = Math.round((totalScrollLength * scrollPercent) / 100);
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