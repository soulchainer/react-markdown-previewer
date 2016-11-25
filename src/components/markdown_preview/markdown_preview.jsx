import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import './markdown_preview.scss';

class MarkdownPreview extends React.Component {
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
    console.log(this.props.scrolledPercent);
    console.log("Preview update " + scrollPercent);
    this.animateScroll(scrollTo, 300);
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoScrolledView === 'preview') {
      this.updateScroll(nextProps.scrolledPercent.editor);
    }
  }

  render() {
    let html = {__html: marked(this.props.markdown)};

    return (
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML= {html}
        onMouseEnter={() => this.props.onMouseEnter() }
        onScroll={event => this.props.onScrollChange(event.target)} />
    );
  }
}

export default MarkdownPreview;