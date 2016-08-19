/*
 * This file is part of INSPIRE.
 * Copyright (C) 2016 CERN.
 *
 * INSPIRE is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * INSPIRE is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with INSPIRE; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */
(function (angular) {


    function trendsDashboard() {

        var controller = ["$scope", "TrendsAPIService", "$uibModal",
            function ($scope, TrendsAPIService, $uibModal) {
                $scope.vm = {};
                $scope.vm.loading = true;
                $scope.vm.searchTerm = null;
                $scope.vm.showRelated = false;

                TrendsAPIService.loadTrends($scope.trendsApi).then(function (result) {
                    $scope.vm.recentTrends = result;
                    options = {};
                    if($scope.vm.recentTrends.min)
                        options.min = $scope.vm.recentTrends.min;

                    if($scope.vm.recentTrends.max)
                        options.max = $scope.vm.recentTrends.max;

                    setTimeout(function () {
                        $scope.vm.recentTrends.data.forEach(function (d, i) {
                            trends_vis.renderTrendArea('#recent-trend-' + i, d.series, options)
                        })

                    }, 0)
                });

                $scope.vm.search = function () {
                    TrendsAPIService.search($scope.trendsApi, $scope.vm.searchTerm).then(function (searchResults) {
                        $scope.vm.searchResults = searchResults;
                    }).catch(function (error) {
                        alert(error);
                        $scope.vm.searchResults = [];
                    });
                }

            }
        ];

        function templateUrl(element, attrs) {
            return attrs.template;
        }

        return {
            templateUrl: templateUrl,
            restrict: 'AE',
            scope: {
                trendsApi: '@trendsApi'
            },
            controller: controller
        };
    }

    angular.module('trends.directives', [])
        .directive('trendsDashboard', trendsDashboard);

})(angular);
