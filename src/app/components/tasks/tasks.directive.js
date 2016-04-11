(function() {
  'use strict';

  angular
    .module('todo')
    .directive('acmeTasks', acmeTasks);

  /** @ngInject */
  function acmeTasks() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/tasks/tasks.html',
      scope: {
          creationDate: '='
      },
      controller: TasksController,
      controllerAs: 'tasks',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TasksController(moment, tasksApi) {
      var tasks = this;
      tasks.data = [];
      tasks.taskInput;

      tasks.relativeDate = moment(tasks.creationDate).fromNow();

      tasks.changePriority = function(id) {
        var priority = tasks.data[id].priority++;
        priority++;
        priority = priority > 3 ? 1 : priority;
        tasks.data[id].priority = priority;
        // Update Remotely
        tasksApi.update({id:id},{priority:priority});
      }
      // Format Date Since Created
      tasks.formatCreatedDate = function(date) {
        return moment(date).fromNow();
      }
      tasks.getPriorityClass = function(priority) {
        return 'priority-'+priority;
      }
      // Get Tasks
      tasks.getTasks = function() {
        var tasksResponse = tasksApi.query();
        tasksResponse.$promise.then(function(response){
          tasks.data = response;
        });
      }
      // Removes Task
      tasks.remove = function(id) {
        // Remove Locally
        delete tasks.data[id];
        // Remove Remotely
        tasksApi.remove({ id: id });
      }
      // Handles new task when submitted
      tasks.submit = function() {
        addNewTask();
      }
      tasks.updateCompleted = function(id) {
        var completed = tasks.data[id].completed ? 0 : 1;
        tasks.data[id].completed = completed;
        tasksApi.update({id:id},{completed:tasks.data[id].completed});
      }

      function addNewTask() {
        var newTask = {
          'title': tasks.taskInput,
          'created_at': moment(),
          'priority': 1
        }
        // Save to database
        tasksApi.save(newTask,function(data) {
          newTask.id = data.id;
          tasks.data[data.id] = newTask;
        });
        // Clear Input
        tasks.taskInput = '';
      }
      // Get Tasks on load
      tasks.getTasks();
    }
  }

})();
