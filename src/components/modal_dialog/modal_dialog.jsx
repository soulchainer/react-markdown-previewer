import React, { Component, PropTypes } from 'react';

import MarkdownEditor from '../markdown_editor/markdown_editor';
import MarkdownGroup from '../markdown_group/markdown_group';

import './_styles/modal_dialog.scss';

class ModalDialog extends Component {
  constructor(props) {
    super(props);
    const markdown = this.props.editorContainer.state.markdown;
    const editor = this.props.editor.node;
    this.markdownHead = markdown.slice(0, editor.selectionStart);
    this.markdownTail = markdown.slice(editor.selectionEnd);
    this.editorSelectedText = markdown.slice(
      editor.selectionStart,
      editor.selectionEnd,
    );
    this.url = '';
    this.text = '';
  }

  componentWillUnmount() {
    console.log("Aquí irá la animación de cierre del componente, quitando una clase"); // eslint-disable-line
  }

  transformMarkdown(action) {
    const separator = (action === 'image') ? '!' : '';
    return `${this.markdownHead}${separator}[${this.text}](${this.url})${this.markdownTail}`;
  }

  renderModalFields() {
    const renderInputField = (id, textContent) => {
      if (id.indexOf('text') !== -1) {
        this.text = textContent;
        return (
          <input
            type="text"
            id={id}
            defaultValue={textContent}
            onChange={(event) => { this.text = event.target.value; }}
          />
        );
      }
      return (
        <input
          type="text"
          id={id}
          onChange={(event) => { this.url = event.target.value; }}
        />
      );
    };

    return this.props.fields.map(field =>
      <div
        className="modal-fields-item"
        key={field.id}
      >
        <label htmlFor={field.id}>{field.label}</label>
        { renderInputField(field.id, this.editorSelectedText) }
      </div>,
    );
  }

  render() {
    return (
      <div className="ModalDialog">
        <div className="modal-container" id="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h2>{this.props.title}</h2>
              <button
                className="modal-close"
                onClick={() => this.props.closeModal()}
              >
                ×
              </button>
            </div>
            <div className="modal-fields">
              {this.renderModalFields()}
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => this.props.closeModal()}
              >
                Cancel
              </button>
              <button
                className="ok-button"
                onClick={() => {
                  this.props.onMarkdownChangeFromModal(this.transformMarkdown(this.props.action));
                  this.props.closeModal();
                }}
              >
                OK
              </button>
            </div>

          </div>
        </div>
        <div className="overlay" id="overlay" />
      </div>
    );
  }
}

ModalDialog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  editor: PropTypes.instanceOf(MarkdownEditor).isRequired,
  editorContainer: PropTypes.instanceOf(MarkdownGroup).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onMarkdownChangeFromModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ModalDialog;
