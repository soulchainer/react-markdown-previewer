import React from 'react';

class MarkdownScrollbox extends React.Component {
  constructor(props) {
    super(props);
    this.name = null;
    this.adjacent = { editor: 'preview', preview: 'editor' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoScrolledView === this.name) {
      this.updateScroll(nextProps.syncedScroll[this.adjacent[this.name]]);
    }
  }

  animateScroll(position, duration) {
    const startPoint = this.node.scrollTop;
    let distance = Math.abs(position - startPoint); // distance to cover
    const frames = (duration * 24) / 1000; // 24 fps
    const timeStep = 1000 / 24; // duration of every frame
    const direction = (position > startPoint) ? 1 : -1; // -1 for upwards
    const scrollStep = distance / frames; // distance by frame
    const scrollInterval = setInterval(() => {
      if (distance > scrollStep) {
        this.node.scrollTop += scrollStep * direction;
        distance -= scrollStep;
      } else {
        this.node.scrollTop += distance * direction;
        clearInterval(scrollInterval);
      }
    }, timeStep);
  }

  updateScroll(scrollPercent) {
    const totalScrollLength = this.node.scrollHeight - this.node.clientHeight;
    const scrollTo = (totalScrollLength * scrollPercent) / 100;
    this.animateScroll(scrollTo, 300);
  }
}

export default MarkdownScrollbox;
