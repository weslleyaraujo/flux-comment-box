var React = require('react'),
  CommentActionCreators = require('../actions/comment-action-creators');

module.exports = React.createClass({

  onSubmit: function () {
    var textNode = this.refs.text.getDOMNode(),
      text = textNode.value;

     textNode.value = '';

     CommentActionCreators.createComment({
       text: text
     });
  },

  render: function() {
    return (
      <div className='comment-form'>
        <textarea ref='text' />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }

});
