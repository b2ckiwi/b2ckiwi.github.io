(function () {
    'use strict';

    angular.module('app')
        .factory('CouponService', [
            '$q', '$interval', '$timeout', '$rootScope', '$http', 'API', 'AuthService', 'CONSTANTS','ngDialog', 'ngToast',
            function ($q, $interval, $timeout, $rootScope, $http, API, AuthService, CONSTANTS, ngDialog, ngToast) {
                var factory = {};
                //var clientId = clientId;
                var entity = 'coupon';
                    var  listEmbeddedStr = '&embedded=images';

                factory.coupon = {
                            id: '',
                            version: '',
                            createdAt: '',
                            updatedAt: '',
                            creator: '',
                            modifier: '',
                            user: '',
                            name: '',
                            images: '',
                            leastPrice: '',
                            expiredOn: '',
                            amount: '',
                    //one-to-one entity
                };

                factory.getByPaging = function (page,size) {
                    return $q(
                        function (resolve, reject) {
                            return $http({
                                method: 'GET',
                                url: API.url + entity + '?page=' + page + '&size=' + size + listEmbeddedStr + '&clientId=' + clientId
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                factory.getBySearchStr = function (str) {
                    return $q(
                        function (resolve, reject) {
                            return $http({
                                method: 'GET',
                                url: API.url + entity + str + listEmbeddedStr + '&clientId=' + clientId
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                factory.getAll = function () {
                    return $q(
                        function (resolve, reject) {
                            return $http({
                                method: 'GET',
                                url: API.url + entity + '?page=1&size=1000000' + listEmbeddedStr + '&clientId=' + clientId
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                factory.get = function (id) {
                    return $q(
                        function (resolve, reject) {
                            if (id) {
                                return $http({
                                    method: 'GET',
                                    url: API.url + entity + '/' + id + '?clientId=' + clientId
                                }).then(
                                    function (resp) {
                                        resolve(resp);
                                    }, function (err) {
                                        reject(err);
                                    });
                            } else {
                                reject(false);
                            }
                        });
                };

                factory.add = function (coupon) {

                    AuthService.checkAuthStatus();
                    return $q(
                        function (resolve, reject) {
                            //debugger;
                            return $http({
                                method: 'POST',
                                url: API.url + entity  + '?clientId=' + clientId,
                                data: coupon
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                factory.update = function (id, coupon) {

                    AuthService.checkAuthStatus();
                    return $q(
                        function (resolve, reject) {
                            //debugger;
                            return $http({
                                method: 'PUT',
                                url: API.url + entity + '/' + id  + '?clientId=' + clientId,
                                data: coupon
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                factory.delete = function (id) {

                    AuthService.checkAuthStatus();
                    return $q(
                        function (resolve, reject) {
                            //debugger;
                            return $http({
                                method: 'DELETE',
                                url: API.url + entity + '/' + id + '?clientId=' + clientId,
                            }).then(
                                function (resp) {
                                    resolve(resp);
                                }, function (err) {
                                    reject(err);
                                });
                        });
                };

                function checkAuth(){
                    if (!AuthService.checkAuthStatus()) {
                        window.location.href = '/signin';
                        return;
                    }
                }

                return factory;

            }]);

})();