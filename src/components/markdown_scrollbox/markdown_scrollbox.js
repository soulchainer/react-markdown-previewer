import React from 'react';
import ReactDOM from 'react-dom';

class MarkdownScrollbox extends React.Component {
  constructor(props) {
    super(props);
    this.name = null;
    this.adjacent = {editor: 'preview', preview: 'editor'};
  }

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
    this.animateScroll(scrollTo, 300);
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoScrolledView === this.name) {
      this.updateScroll(nextProps.syncedScroll[this.adjacent[this.name]]);
    }
  }
}

export default MarkdownScrollbox;