'use strict';

/* Controllers */

var app = angular.module('ngdemoApp.controllers', []);

// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
app.run(function ($rootScope, $templateCache) {
	$rootScope.$on('$viewContentLoaded', function () {
		$templateCache.removeAll();
	});
});

app.controller('DummyCtrl', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
			$scope.bla = 'bla from controller';
			console.log("dummy ctrl");
			DummyFactory.query({}, function (data) {
				$scope.foo = data.firstName;
			})
		}
	]);

app.controller('CARCtrl', ['$scope', 'AccountsService', function ($scope, AccountsService) {
			$scope.accounts = AccountsService;
			$scope.init = function(){
				console.log("ctrl init");
				AccountsService.loadAccounts().then(function(result){
					$scope.accounts = result.data;
				});
				AccountsService.loadPersons().then(function(result){
					$scope.persons = result.data;
					console.log(result.data);
				});
			}
			
			$scope.transactions = [{
					"no": "1",
					"explicatii": "test",
					"debitoare": "123",
					"creditoare": "456",
					"suma": "100",
					"personTransactions": [{
							"id": "",
							"suma": 0,
							"nume":""
						}
					]
				}
			];
			$scope.addNew = function (personalDetail) {
				$scope.transactions.push({
					"no": "",
					"explicatii": "",
					"debitoare": "",
					"creditoare": "",
					"suma": "",
					"personTransactions": [{
							"id": "",
							"suma": 0,
							"nume":""
						}]
				});
			};
			$scope.save = function () {
				console.log($scope.transactions);
				AccountsService.submitForm($scope.transactions).then(function(result){
					console.log(result);
				});
			};
			$scope.personInvolved = function (transaction) {
				if (!!transaction && (transaction.debitoare.car || transaction.creditoare.car)) {
					return true;
				} else {
					return false;
				}
			}
			$scope.addNewPerson = function (transaction) {
				transaction.personTransactions.push({
					"id": "",
					"suma": 0
				});
			}
			$scope.getTotal = function (transaction) {
				var total = 0;
				for (var i = 0; i < transaction.personTransactions.length; i++) {
					total += transaction.personTransactions[i].suma;
				}
				return total;
			}

		}
	]);

app.controller('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
		function ($scope, UsersFactory, UserFactory, $location) {

			/* callback for ng-click 'editUser': */
			$scope.editUser = function (userId) {
				$location.path('/user-detail/' + userId);
			};

			/* callback for ng-click 'deleteUser': */
			$scope.deleteUser = function (userId) {
				UserFactory.delete ({
					id: userId
				});
				$scope.users = UsersFactory.query();
			};

			/* callback for ng-click 'createUser': */
			$scope.createNewUser = function () {
				$location.path('/user-creation');
			};

			$scope.users = UsersFactory.query();
		}
	]);

app.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
		function ($scope, $routeParams, UserFactory, $location) {

			/* callback for ng-click 'updateUser': */
			$scope.updateUser = function () {
				UserFactory.update($scope.user);
				$location.path('/user-list');
			};

			/* callback for ng-click 'cancel': */
			$scope.cancel = function () {
				$location.path('/user-list');
			};

			$scope.user = UserFactory.show({
					id: $routeParams.id
				});
		}
	]);

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location',
		function ($scope, UsersFactory, $location) {

			/* callback for ng-click 'createNewUser': */
			$scope.createNewUser = function () {
				UsersFactory.create($scope.user);
				$location.path('/user-list');
			}
		}
	]);
