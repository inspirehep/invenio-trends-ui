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
    /**
     * HoldingPenRecordService allows for the getting, update and resolution of
     * workflow records.
     */
    angular.module('trends.services', [])
        .factory("TrendsAPIService", ["$http",
                function ($http) {

                    var _default_data = {
                        stats: {
                            minValue: 0,
                            maxValue: 67,
                            minDate: '2014-03-01',
                            maxDate: '2014-12-06'
                        },

                        related_terms: {
                            'Quantum chromodynamics': ["QCD"],
                            'plasma physics': [],
                            'lasers': []
                        },

                        data: [{
                            name: 'Quantum chromodynamics',
                            series: [
                                {date: '2014-03-01', value: 0},
                                {date: '2014-04-01', value: 0},
                                {date: '2014-05-01', value: 2},
                                {date: '2014-06-01', value: 5},
                                {date: '2014-07-01', value: 11},
                                {date: '2014-08-01', value: 11},
                                {date: '2014-09-01', value: 27},
                                {date: '2014-10-01', value: 27},
                                {date: '2014-11-01', value: 47},
                                {date: '2014-12-01', value: 57}
                            ]
                        }, {
                            name: 'plasma physics',
                            series: [
                                {date: '2014-03-01', value: 0},
                                {date: '2014-04-01', value: 0},
                                {date: '2014-05-01', value: 2},
                                {date: '2014-06-01', value: 5},
                                {date: '2014-07-01', value: 1},
                                {date: '2014-08-01', value: 7},
                                {date: '2014-09-01', value: 17},
                                {date: '2014-10-01', value: 27},
                                {date: '2014-11-01', value: 47},
                                {date: '2014-12-01', value: 49}
                            ]
                        },
                            {
                                name: 'lasers',
                                series: [
                                    {date: '2014-03-01', value: 0},
                                    {date: '2014-04-02', value: 1},
                                    {date: '2014-05-05', value: 1},
                                    {date: '2014-06-27', value: 0},
                                    {date: '2014-07-06', value: 0},
                                    {date: '2014-08-06', value: 0},
                                    {date: '2014-09-06', value: 3},
                                    {date: '2014-10-06', value: 5},
                                    {date: '2014-11-06', value: 9},
                                    {date: '2014-12-06', value: 19}
                                ]
                            },
                            {
                                name: 'QCD',
                                series: [
                                    {date: '2014-03-01', value: 0},
                                    {date: '2014-04-06', value: 0},
                                    {date: '2014-05-06', value: 2},
                                    {date: '2014-06-06', value: 5},
                                    {date: '2014-07-06', value: 11},
                                    {date: '2014-08-06', value: 7},
                                    {date: '2014-09-06', value: 17},
                                    {date: '2014-10-06', value: 17},
                                    {date: '2014-11-06', value: 47},
                                    {date: '2014-12-06', value: 37}
                                ]
                            }]
                    };

                    return {

                        search: function (apiEndpoint, searchTerm) {
                            return $http.get(apiEndpoint + searchTerm).then(function (response) {
                                return response.data;
                            }).catch(function (value) {
                                console.debug('in catch...');
                                return JSON.parse(JSON.stringify(_default_data));
                            });
                        },


                        loadTrends: function (apiEndpoint) {
                            return $http.get(apiEndpoint + 'recent').then(function (response) {
                                return response.data;
                            }).catch(function (value) {
                                console.debug('in catch...');
                                return JSON.parse(JSON.stringify(_default_data));
                            });

                        }
                    }
                }
            ]
        )
    ;
}(angular));