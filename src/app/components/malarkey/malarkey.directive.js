(function() {
  'use strict';

  angular
    .module('todo')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      template: '',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 9000,
        loop: true,
        postfix: ''
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      // watcher = scope.$watch('vm.contributors', function() {
      //   angular.forEach(vm.contributors, function(contributor) {
      //     typist.type(contributor.login).pause().delete();
      //   });
      // });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController() {
      // var vm = this;

      // vm.contributors = [];

    //   activate();

    //   function activate() {
    //     return getTasks().then(function() {
    //       //$log.info('Activated Contributors View');
    //     });
    //   }

    //   function getTasks() {
    //     return tasksApi.getTasks().then(function(data) {
    //       vm.contributors = data;

    //       return vm.contributors;
    //     });
    //   }
    }

  }

})();
