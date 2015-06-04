var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  deleteComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: 'DELETE_COMMENT',
      comment: comment
    });
  }
};
