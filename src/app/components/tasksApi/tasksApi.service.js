(function() {
  'use strict';

  angular
    .module('todo')
    .factory('tasksApi', tasksApi);

  /** @ngInject */
  function tasksApi($resource) {
    // var api_host = 'http://api.todo.dev';
    var api_host = 'http://api.storelodge.com';
    return $resource(api_host+'/tasks/:id', {id:'@id'},{
      'query': {method: 'GET', isArray: false },
      'update': {method: 'PUT'}
    });
  }
})();
