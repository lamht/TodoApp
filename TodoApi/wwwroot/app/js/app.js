'use strict';
log.setLevel("debug", false);
log.debug("hello!");
log.info("hello!");
log.warn("hello!");
log.error("hello!");


var app = angular.module('myApp', []);
app.controller('todoCtrl', function($scope, $http, $timeout) {
    $timeout(function () {
        $scope.getAll();
        log.info("Get all todos");
    }, 200);

    $scope.showList = true;
    $scope.editMode = false;
    $scope.detailModel = null;


    $scope.getAll = function() {
        $http.get("api/todo/")
        .then(function (response) {
            $scope.todos = response.data;
        });
    }
    $scope.add = function(todo) {
       
        $http.post("api/todo/", todo)
        .then(function (response){
            log.info("Add todo sucessfull");

            $scope.getAll();
            $scope.showList = true;
        });
    }
    $scope.remove = function(todo) {
        var url = "api/todo/" + todo.id;
        $http.delete(url)
        .then(function (response){
            log.info("Remove todo sucessfull");
            $scope.getAll();
        });
    }
    $scope.update = function(todo) {
        var url = "api/todo/" + todo.id;
        $http.put(url, todo)
        .then(function (response){
            log.info("Update todo sucessfull");
            
            $scope.getAll();
            $scope.showList = true;
        });
    }
    $scope.get = function(id) {
        var url = "api/todo/" + id;
        $http.get(url, todo)
        .then(function (response){
            log.info(response.data);
        });
    }
    $scope.makeComplete = function (todo){
        todo.isComplete = true;
        $scope.update(todo);
        $scope.todos.find(t => t.id = todo.id).isComplete = true;
    }
    $scope.edit = function (todo){
        $scope.detailModel = todo;
        $scope.editMode = true;
        $scope.showList = false;
        log.info($scope.showList);
    }
    $scope.new = function (){
        var todo = {};
        todo.name ="";

        $scope.detailModel = todo;
        $scope.editMode = false;
        $scope.showList = false;
    }

    $scope.showListUI = function(){
        $scope.showList = true;
    }

});