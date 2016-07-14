'use strict';

/*
  - app.controllers.js
  - app.directives.js
  - app.filters.js
  - app.module.js
  - app.services.js
*/

import angular from "angular";
import d3 from 'd3';

import 'nvd3';
import 'angular-nvd3';
import 'babel-polyfill';

const templateUrl = 'trends-search.html';
const apiUrl = 'http://localhost:5000/';

const controller = ($scope, $log, $http) => {

  /*
    deuteron
    muon production
    elastic scattering
   */
  $scope.search = () => {

  };

  $scope.searchInput = '';

  const dateFormatter = d => d3.time.format('%Y-%m-%d')(new Date(d));

  $scope.options = {
    chart: {
      type: 'lineWithFocusChart',
      height: 400,
      x: d => new Date(d.x),
      y: d => d.y,
      xScale: d3.time.scale(),
      transitionDuration: 500,
      xAxis: {
        tickFormat: dateFormatter
      },
      x2Axis: {
        tickFormat: dateFormatter,
        showMaxMin: false
      },
      y1Axis: {
        tickFormat: d3.format('d'),
        axisLabelDistance: 12
      },
      y2Axis: {
        tickFormat: d3.format('d')
      }
    }
  };

  $scope.data = [];

  $scope.send = async () => {
    const terms = $scope.searchInput;
    const url = apiUrl + 'hist/' + terms;
    $log.info('sent: ' + url);


    $http
      .get(url, { timeout: 1000 })
      .catch(err => {
        $log.info('error');
        $log.error(err);
      })
      .then(rep => {

        $log.info(rep);

        /*nv.addGraph(() => {
          const plt = nv.models.lineWithFocusChart();


          plt.x(d => new Date(d.x));
          plt.xScale = d3.time.scale();
          plt.xAxis.tickFormat(dateFormatter);
          plt.x2Axis.tickFormat(dateFormatter);
          plt.yAxis.tickFormat(d3.format('d'));
          plt.y2Axis.tickFormat(d3.format('d'));

          d3
            .select('#graph svg')
            .datum(rep.data)
            .transition()
            .duration(500)
            .call(plt);

          nv.utils.windowResize(plt.update);

          return plt;
        });*/

        $scope.data = rep.data;
        $log.debug($scope);
        $scope.api.update();


      });

  };


};

/*
 myApp.value('http_defaults', {
 timeout: 150
 });
 myApp.controller('TodoCtrl', function ($scope, $http, http_defaults) {
*/

angular
  .module('invenio-trends', ['nvd3'])
  .component('trendsSearch', {
    templateUrl,
    controller
  });

