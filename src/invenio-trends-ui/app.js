'use strict';

/*
  - app.controllers.js
  - app.directives.js
  - app.filters.js
  - app.module.js
  - app.services.js
*/

import angular from "angular";
import nv from 'nvd3';
import d3 from 'd3';

const templateUrl = 'trends-search.html';
const apiUrl = 'http://localhost:9000/search';

const controller = ($scope, $log) => {

  $scope.search = () => {
    $log.log($scope.searchInput)
  };

};

nv.addGraph(() => {
  var chart = nv.models.lineWithFocusChart();

  chart.xAxis.tickFormat(d3.format(',f'));
  chart.yAxis.tickFormat(d3.format(',.2f'));
  chart.y2Axis.tickFormat(d3.format(',.2f'));

  const data = [
    {
      key: "label",
      values: [
        {
          x: 1,
          y: 3.5
        },
        {
          x: 5,
          y: 3.0
        }
      ]
    }
  ];

  d3
    .select('#graph svg')
    .datum(data)
    .transition()
    .duration(500)
    .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});

angular
  .module('invenio-trends', [])
  .component('trendsSearch', {
    templateUrl,
    controller
  });

