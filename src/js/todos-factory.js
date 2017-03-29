angular.module('app').factory('TodosFactory', function ($q, $http) {
	return {
		list: function () {
			var promessa = $q.defer();

			$http.get('https://todo-list-78110.firebaseio.com/todos.json')
				.then(function (result) {
					var todos = [];
					angular.forEach(result.data, function (todo, id) {
						todo.id = id;
						todos.push(todo);
					});
					promessa.resolve(todos);
				});

			return promessa.promise;
		},
		add: function (todo) {
			var id = todo.id;
			delete todo.id;

			return $http.put('https://todo-list-78110.firebaseio.com/todos/' + id + '.json', todo);
		},
		change: function (todo) {
			var id = todo.id, completed = !todo.completed;

			return $http.put('https://todo-list-78110.firebaseio.com/todos/' + id + '/completed.json', completed);
		},
		remove: function (id) {
			$http.delete('https://todo-list-78110.firebaseio.com/todos/' + id + '.json');
		},
		removeCompleteds: function () {
			var promessa = $q.defer();

			$http.get('https://todo-list-78110.firebaseio.com/todos.json')
				.then(function (result) {
					var todos = [];
					angular.forEach(result.data, function (todo, id) {
						todo.id = id;
						var completed = todo.completed;
						if(completed) {
							console.log('no if')
			$http.delete('https://todo-list-78110.firebaseio.com/todos/' + todo.id + '.json');
						} else {
						todos.push(todo);
						}
					});
					promessa.resolve(todos);
				});

			return promessa.promise;
		}
	};
});