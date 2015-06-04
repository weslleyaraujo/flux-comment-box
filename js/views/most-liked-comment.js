var React = require('react'),
  CommentStore = require('../stores/comment-store');

module.exports = React.createClass({
  getInitialState: function () {
    return CommentStore.getMostLiked();
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState(CommentStore.getMostLiked())
  },

  render: function () {
    return (
      <div className='most-liked'>
      { this.state.text ? 'The most liked comment is: ' : '' }
      <i>"{ this.state.text || 'no comments yet' }"</i>
      </div>
    );
  }
});
