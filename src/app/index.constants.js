/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('todo')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
