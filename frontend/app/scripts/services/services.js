'use strict';

var services = angular.module('ngdemoApp.services', ['ngResource']);

var baseUrl = 'http://localhost:8081';

services.factory('DummyFactory', function ($resource) {
    return $resource(baseUrl + '/ngdemo/web/dummy', {}, {
        query: { method: 'GET', params: {} }
    })
});

services.factory('UsersFactory', function ($resource) {
    return $resource(baseUrl + '/ngdemo/web/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource(baseUrl + '/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

services.factory('AccountsService', function ($http,$resource) {
	return {
		loadAccounts: function(){
			return $http.get(baseUrl + '/accounts');
		},
		loadPersons: function(){
			return $http.get(baseUrl + '/persons');
		},
		submitForm: function(data){
			return $http.post(baseUrl + '/submitForm',data);
		}
	}
	
    // return {
		// "101":"Capital",
		// "1063.01":"Rezerve Statutare",
		// "1063.02":"Rezerve de Risc",
		// "113.01.01":"Fondul social al membrilor car"
	// };
});
