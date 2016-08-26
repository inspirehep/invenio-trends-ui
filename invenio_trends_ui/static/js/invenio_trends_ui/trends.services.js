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
                    return {

                        search: function (apiEndpoint, searchTerm) {
                            return $http.get(apiEndpoint + 'search/' + encodeURI(searchTerm)).then(function (response) {
                                return response.data;
                            }).catch(function (value) {
                                console.error('cannot fetch trend histogram', value);
                                return JSON.parse(JSON.stringify(_default_data));
                            });
                        },

                        loadTrends: function (apiEndpoint) {
                            return $http.get(apiEndpoint + 'emerging').then(function (response) {
                                return response.data;
                            }).catch(function (value) {
                                console.error('cannot fetch emerging trends', value);
                                return JSON.parse(JSON.stringify(_default_data));
                            });

                        }
                    }
                }
            ]
        )
    ;
}(angular));
