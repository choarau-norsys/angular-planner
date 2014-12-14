'use strict';

/**
 * @ngdoc service
 * @name plannerApp.resourceService
 * @description
 * # resourceService
 * Factory in the plannerApp.
 */
angular.module('plannerApp')
        .factory('resourceService', function ($q) {

            var setUp = false;
            var db;

            function init() {
                var deferred = $q.defer();

                if (setUp) {
                    deferred.resolve(true);
                    return deferred.promise;
                }

                var openRequest = window.indexedDB.open("planner_app_idxdb", 1);

                openRequest.onerror = function (e) {
                    console.log("Error opening db");
                    console.dir(e);
                    deferred.reject(e.toString());
                };

                openRequest.onupgradeneeded = function (e) {
                    var thisDb = e.target.result;
                    var objectStore;

                    if (!thisDb.objectStoreNames.contains("resources")) {
                        objectStore = thisDb.createObjectStore("resources", {keyPath: "id", autoIncrement: true});
                        objectStore.createIndex("lastName", "lastName", {unique: false});
                        objectStore.createIndex("firstName", "firstName", {unique: false});
                        objectStore.createIndex("group", "group", {unique: false});
                        objectStore.createIndex("activities", "activities", {unique: false});
                    }
                };

                openRequest.onsuccess = function (e) {
                    db = e.target.result;

                    db.onerror = function (event) {
                        // Generic error handler for all errors targeted at this database's
                        // requests!
                        deferred.reject("Database error: " + event.target.errorCode);
                    };

                    setUp = true;
                    deferred.resolve(true);
                };

                return deferred.promise;
            }

            function isSupported() {
                return ("indexedDB" in window);
            }

            function saveResource(resource) {

                var deferred = $q.defer();

                if (!resource.id)
                    resource.id = "";

                var t = db.transaction(["resources"], "readwrite");

                if (resource.id === "") {
                    t.objectStore("resources")
                            .add({lastName: resource.lastName, firstName: resource.firstName, group: resource.group, activites: {}});
                } else {
                    t.objectStore("resources")
                            .put({id: Number(resource.id), lastName: resource.lastName, firstName: resource.firstName, group: resource.group, activities: resource.activities});
                }

                t.oncomplete = function (event) {
                    deferred.resolve();
                };

                return deferred.promise;
            }

            function getResource(id) {
                var deferred = $q.defer();

                var transaction = db.transaction(["resources"]);
                var objectStore = transaction.objectStore("resources");
                var request = objectStore.get(id);

                request.onsuccess = function (event) {
                    var resource = request.result;
                    deferred.resolve(resource);
                };

                return deferred.promise;
            }

            function getResources() {
                var deferred = $q.defer();

                var result = [];

                var handleResult = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        result.push({
                            id: cursor.key,
                            lastName: cursor.value.lastName,
                            firstName: cursor.value.firstName,
                            group: cursor.value.group,
                            activities: cursor.value.activities
                        });
                        cursor.continue();
                    }
                };

                var transaction = db.transaction(["resources"], "readonly");
                var objectStore = transaction.objectStore("resources");
                objectStore.openCursor().onsuccess = handleResult;

                transaction.oncomplete = function (event) {
                    deferred.resolve(result);
                };

                return deferred.promise;
            }

            function deleteResource(id) {
                var deferred = $q.defer();
                var t = db.transaction(["resources"], "readwrite");
                var request = t.objectStore("resources").delete(id);
                t.oncomplete = function (event) {
                    deferred.resolve();
                };
                return deferred.promise;
            }

            return {
                init: init,
                isSupported: isSupported,
                saveResource: saveResource,
                getResource: getResource,
                getResources: getResources,
                deleteResource: deleteResource
            };
        });
