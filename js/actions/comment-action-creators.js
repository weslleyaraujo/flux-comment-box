var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  createComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: 'CREATE_COMMENT',
      comment: comment
    });
  }
};
