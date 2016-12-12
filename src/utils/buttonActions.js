const ButtonAction = (self, btnName) => {
  const clearEditor = () => {
    self.setState({ markdown: '' });
    self.props.togglePendingAction(btnName);
  };

  // Calculate the text range to be selected after insert the format.
  // It will be returned to the component, to allow it to select the text
  const calculateTextRange = (textStart, text, delimiters) => {
    const start = textStart + delimiters[0].length;
    const end = start + text.length;
    return [start, end];
  };

  // Insert default text with the chosen format when no text is selected
  const insertFormat = (position) => {
    const [startDelimiter, endDelimiter] = ButtonAction.format[btnName].delimiters;
    const text = ButtonAction.format[btnName].text;
    const textToAdd = `${startDelimiter}${text}${endDelimiter}`;
    const end = self.state.markdown.length - 1;
    if (position === 0) {
      self.setState({ markdown: `${textToAdd}${self.state.markdown}` });
    } else if (position === end) {
      self.setState({ markdown: `${self.state.markdown}${textToAdd}` });
    } else {
      self.setState({ markdown: `${self.state.markdown.slice(0, position)}${textToAdd}${self.state.markdown.slice(position)}` });
    }
    return calculateTextRange(position, text, [startDelimiter, endDelimiter]);
  };

  // Format the selected text with the chosen format or delete the text and
  // insert the default text for special options (as the horizontal rule)
  const formatSelection = (selection) => {
    const [startDelimiter, endDelimiter] = ButtonAction.format[btnName].delimiters;
    const [start, end] = selection;
    const md = self.state.markdown;
    const text = (startDelimiter) ? md.slice(start, end) : ButtonAction.format[btnName].text;

    if (start === 0) {
      self.setState({ markdown: `${startDelimiter}${text}${endDelimiter}${md.slice(end)}` });
    } else {
      self.setState({ markdown: `${md.slice(0, start)}${startDelimiter}${text}${endDelimiter}${md.slice(end)}` });
    }
    return calculateTextRange(start, text, [startDelimiter, endDelimiter]);
  };

  // Choose between insert the default text formated or format the selected text
  const textFormat = () => {
    const node = self.node.node;
    const [start, end] = [node.selectionStart, node.selectionEnd];
    let contentSelection;
    if (start === end) {
      contentSelection = insertFormat(start, btnName);
    } else {
      contentSelection = formatSelection([start, end], btnName);
    }
    self.props.togglePendingAction(btnName);
    return contentSelection;
  };

  // directly execute the proper action when ButtonAction is called
  switch (btnName) {
    case 'clear':
      return clearEditor();
    default:
      return textFormat();
  }
};

ButtonAction.format = {
  bold: { text: 'strong text', delimiters: ['**', '**'] },
  emp: { text: 'emphasized text', delimiters: ['*', '*'] },
  bemp: { text: 'strong and emphasized', delimiters: ['***', '***'] },
  ol: { text: 'List item', delimiters: ['\n\n1. ', '\n'] },
  ul: { text: 'List item', delimiters: ['\n\n- ', '\n'] },
  hr: { text: '\n\n---\n', delimiters: ['', ''] },
  blockquote: { text: 'Blockquote', delimiters: ['\n\n> ', '\n'] },
};

// TODO: use this for the multiple click behaviour
ButtonAction.formatDelimiters = Object.values(ButtonAction.format).map(value => value.delimiters);

export default ButtonAction;
export const buttonList = ['clear', ...Object.keys(ButtonAction.format)];
export const selectText = (node, textBoundaries) => {
  const [start, end] = textBoundaries;
  node.focus();
  node.setSelectionRange(start, end);
};
