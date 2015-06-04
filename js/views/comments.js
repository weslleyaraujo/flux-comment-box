var React = require('react'),
  CommentStore = require('../stores/comment-store');


var Comments = React.createClass({

  onChange: function () {
    this.setState(CommentStore.getAll())
  },

  getInitialState: function () {
    return {
      comments: CommentStore.getAll()
    }
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    CommentStore.removeChangeListener(this.onChange);
  },

  render: function () {

    var comments = this.state.comments.map(function (comment, index) {
      return (
        <div className='comment' key={'comment-' +index}>
          {comment.text}
        </div>
      );
    });

    return(
      <div className='comments'>
        {comments}
      </div>
    );
  }

});

module.exports = Comments;
