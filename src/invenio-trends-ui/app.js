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
import "babel-polyfill";

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

        $log.debug(rep);
        $log.debug('poi');

        nv.addGraph(() => {
          const plt = nv.models.lineWithFocusChart();
          const dateFormatter = d => d3.time.format('%Y-%m-%d')(new Date(d));


          plt.x(d => new Date(d.x));
          plt.xScale = d3.time.scale();
          plt.xAxis.tickFormat(dateFormatter);
          plt.x2Axis.tickFormat(dateFormatter);
          //chart.yAxis.tickFormat(d3.format(',.2f'));
          //chart.y2Axis.tickFormat(d3.format(',.2f'));

          d3
            .select('#graph svg')
            .datum(rep.data)
            .transition()
            .duration(500)
            .call(plt);

          nv.utils.windowResize(plt.update);

          return plt;
        });
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
  .module('invenio-trends', [])
  .config($httpProvider => {
    $httpProvider.defaults.timeout = 1000;
  })
  .component('trendsSearch', {
    templateUrl,
    controller
  });

