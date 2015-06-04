var React = require('react');

var Comments = require('./views/comments'),
  CommentForm = require('./views/comment-form');
  MostLikedComment = require('./views/most-liked-comment'),
  App = React.createClass({

  render: function() {
    return (
      <div>
        <Comments />
        <CommentForm />

        <br />
        <MostLikedComment />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
