var React = require('react'),
  CommentStore = require('../stores/comment-store');
  CommentActionsLikes = require('../actions/comment-action-likes');


module.exports = React.createClass({

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

  getCommentId: function (element) {
    return element.attributes['data-comment-id'].value;
  },

  onClickLike: function (event) {

     CommentActionsLikes.likeComment({
       id: this.getCommentId(event.currentTarget)
     });

     event.preventDefault();
  },

  getComments: function () {
    return this.state.comments.map(function (comment, index) {
      return (
        <div className='comment' key={'comment-' +index}>
          <p>{comment.text}</p>
          <p>{comment.likes}</p>
          <a href="#" onClick={this.onClickLike} data-comment-id={comment.id}>Like!</a>
        </div>
      );
    }.bind(this));
  },

  render: function () {
    var comments = this.getComments();

    return(
      <div className='comments'>
        {comments}
      </div>
    );
  }

});
