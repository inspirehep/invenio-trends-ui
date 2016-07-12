'use strict';

import angular from "angular";

const templateUrl = 'trends-search.html';

const controller = $scope => {

  $scope.hello = 'world';
  $scope.update = () => {
    console.log($scope.input)
  };

};

angular
  .module('invenio-trends', [])
  .component('trendsSearch', {
    templateUrl,
    controller
  });
