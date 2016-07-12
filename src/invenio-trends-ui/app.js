'use strict';

import angular from "angular";

const templateUrl = 'trends-search.html';

const controller = ($scope, $log) => {

  $scope.hello = 'world';
  $scope.update = () => {
    $log.log($scope.input)
  };

};

angular
  .module('invenio-trends', [])
  .component('trendsSearch', {
    templateUrl,
    controller
  });
