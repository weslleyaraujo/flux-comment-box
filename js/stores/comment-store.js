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
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case 'CREATE_COMMENT':
      comments.push(action.comment);
      CommentStore.emitChange();
      break;

    default:
  }
});

module.exports = CommentStore;
