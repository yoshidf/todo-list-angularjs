var app=angular.module("app",["todos-directives","ngMaterial"]);angular.module("app").controller("TodosController",["$scope","TodosFactory",function(o,t){o.todos=[],o.ready=!1,o.showCompleteds=!0;var e=function(){t.list(o.showCompleteds).then(function(t){o.todos=t,o.ready=!0})};o.addTodo=function(){var n={};o.title?(n.id=Date.now()+"",n.title=o.title,n.date=(new Date).toLocaleDateString("en-GB"),n.completed=!1):alert("Título obrigatório"),o.todos.push(n),o.title="",t.add(n).then(e),o.new_todo.$setPristine(),o.new_todo.$setUntouched()},o.removeTodo=function(e){t.remove(e.id);var n=o.todos.indexOf(e);o.todos.splice(n,1)},o.completeTodo=function(o){t.change(o).then(e)},o.removeCompleteds=function(){t.removeCompleteds().then(e)},o.listCompleteds=function(){e()},e()}]);var app=angular.module("todos-directives",[]);app.directive("addTodoForm",function(){return{restrict:"E",templateUrl:"views/add-todo.html"}}),app.directive("loading",function(){return{retrict:"AE",templateUrl:"common/loading.html"}}),app.directive("listTodos",function(){return{restrict:"E",templateUrl:"views/list-todos.html"}}),angular.module("app").factory("TodosFactory",["$q","$http",function(o,t){var e="https://todo-list-78110.firebaseio.com";return{list:function(n){var r=o.defer();return t.get(e+"/todos.json").then(function(o){var t=[];angular.forEach(o.data,function(o,e){o.id=e;var r=o.completed;n?t.push(o):r||t.push(o)}),r.resolve(t)}),r.promise},add:function(o){var n=o.id;return delete o.id,t.put(e+"/todos/"+n+".json",o)},change:function(o){var n=o.id,r=!o.completed;return t.put(e+"/todos/"+n+"/completed.json",r)},remove:function(o){t.delete(e+"/todos/"+o+".json")},removeCompleteds:function(){var n=o.defer();return t.get(e+"/todos.json").then(function(o){var r=[];angular.forEach(o.data,function(o,n){o.id=n,o.completed?t.delete(e+"/todos/"+n+".json"):r.push(o)}),n.resolve(r)}),n.promise}}}]);