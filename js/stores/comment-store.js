var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  CommentStore,
  assing = require('object-assign'),
  comments = [];

CommentStore = assing({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeChangeListener('change', callback);
  },

  getAll: function () {
    return comments;
  },

  getById: function (id) {
    return comments.filter(function (comment) {
      return comment.id === id;
    })[0];
  },

  getMostLiked: function () {
    return comments.reduce(function (iterator, comment, index) {
      iterator = comment.likes > iterator.likes ? comment : iterator;
      return iterator;
    }, {
      text: 0,
      likes: 0
    });
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case 'CREATE_COMMENT':
      comments.push(action.comment);
      CommentStore.emitChange();
      break;

    case 'LIKE_COMMENT':
      var comment = CommentStore.getById(action.comment.id);
      comment.likes++;
      CommentStore.emitChange();
      break;

    default:

  }
});

module.exports = CommentStore;
