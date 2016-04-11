(function() {
  'use strict';

  angular
    .module('todo')
    .factory('tasksApi', tasksApi);

  /** @ngInject */
  function tasksApi($resource) {
    return $resource('http://api.todo.dev/tasks/:id', {id:'@id'},{
      'query': {method: 'GET', isArray: false },
      'update': {method: 'PUT'}
    });
  }
})();
