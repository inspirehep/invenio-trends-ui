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

        var controller = ["$scope", "TrendsAPIService", "$uibModal", "$window", "$httpParamSerializer",
            function ($scope, TrendsAPIService, $uibModal, $window, $httpParamSerializer) {
                $scope.vm = {};
                $scope.vm.loading = true;
                $scope.vm.searchTerm = null;
                $scope.vm.showRelated = false;

                TrendsAPIService.loadTrends($scope.trendsApi).then(function (result) {
                    $scope.vm.recentTrends = result;
                    options = {};
                    if ($scope.vm.recentTrends.stats)
                        options = $scope.vm.recentTrends.stats;

                    setTimeout(function () {
                        $scope.vm.recentTrends.data.forEach(function (d, i) {
                            trends_vis.renderTrendArea('#recent-trend-' + i, d.series, options)
                        })

                    }, 0)
                });

                $scope.vm.search = function () {
                    TrendsAPIService.search($scope.trendsApi, $scope.vm.searchTerm).then(function (searchResults) {
                        $scope.vm.searchResults = searchResults;

                        options = {};
                        if ($scope.vm.searchResults.stats)
                            options = $scope.vm.searchResults.stats;

                        options.height = 300;

                        setTimeout(function () {
                            trends_vis.renderCompositeTrends('#trends-search-result', '#trends-search-legend', $scope.vm.searchResults.data, $scope.vm.searchResults.related_terms, options)
                        }, 0)

                    }).catch(function (error) {
                        console.debug("Nothing...");
                        $scope.vm.searchResults = [];
                    });
                };

                $scope.vm.showPublications = function (trend, start, end) {
                    var query = {
                        cc: "literature",
                        q: "abstract:'"+trend+"' earliest_date:" + start + '->' + end
                    };
                    $window.location.href = '../search?' + $httpParamSerializer(query);
                };
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
