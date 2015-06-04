var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  likeComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: 'LIKE_COMMENT',
      comment: comment
    });
  }
};
