var React = require('react'),
  CommentActionCreators = require('../actions/comment-action-creators');

module.exports = React.createClass({

  componentDidMount: function() {
    this.prepare();
  },

  prepare: function () {
    this.elements = {};
    this.elements.text = this.refs.text.getDOMNode();
  },

  clearText: function () {
    this.elements.text.value = "";
  },

  getValue: function () {
    try {
      return this.elements.text.value;
    } catch (e) {
      return '';
    }
  },

  isEmpty: function () {
    return !this.getValue();
  },

  onSubmit: function (event) {

    if (!this.isEmpty()) {
      this.emmitComment();
      this.clearText();
    }

    event.preventDefault();

  },

  emmitComment: function (value) {
     CommentActionCreators.createComment({
       id: Date.now().toString(),
       text: this.getValue(),
       likes: 0
     });
  },

  render: function() {
    return (
      <form className='comment-form' onSubmit={this.onSubmit}>
        <textarea ref='text' />
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }

});
