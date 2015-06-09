var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  CommentStore,
  assing = require('object-assign'),
  _ = require('underscore'),
  comments = [];

function removeItem (comment) {
}

CommentStore = assing({}, EventEmitter.prototype, {
  save: function () {
    window.localStorage.setItem('comments', JSON.stringify(comments));
  },

  prepare: function () {
    try {
      comments = JSON.parse(window.localStorage.getItem('comments').split(','));
    } catch (e) { }
  },

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

CommentStore.prepare();

AppDispatcher.register(function (action) {


  switch (action.actionType) {

    case 'CREATE_COMMENT':
      comments.push(action.comment);
      CommentStore.save();
      CommentStore.emitChange();
      break;

    case 'LIKE_COMMENT':
      var comment = CommentStore.getById(action.comment.id);
      comment.likes++;
      CommentStore.save();
      CommentStore.emitChange();
      break;

    case 'DELETE_COMMENT':
      comments = _.filter(comments, function (item) {
        return item.id !== action.comment.id;
      });
      CommentStore.save();
      CommentStore.emitChange();
      break;

    default:
      break;

  }
});

module.exports = CommentStore;
