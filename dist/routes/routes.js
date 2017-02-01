"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _routesMethodsExport = require('./routesMethodsExport.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = function routes(app, compiler) {

    app.get('/', function (req, res, next) {
        _routesMethodsExport.RoutesMethods.PagesRoutes.mainPage(req, res, app, next, compiler);
    });

    app.get('/season1', function (req, res, next) {
        _routesMethodsExport.RoutesMethods.PagesRoutes.season1Page(req, res, app, next, compiler);
    });

    app.get('/season2', function (req, res, next) {
        _routesMethodsExport.RoutesMethods.PagesRoutes.season2Page(req, res, app, next, compiler);
    });

    app.get('/donation', function (req, res, next) {
        _routesMethodsExport.RoutesMethods.PagesRoutes.donationPage(req, res, app, next, compiler);
    });

    app.get('/contacts', function (req, res, next) {
        _routesMethodsExport.RoutesMethods.PagesRoutes.contactsPage(req, res, app, next, compiler);
    });

    app.get('/season1data', function (req, res) {
        _routesMethodsExport.RoutesMethods.DataRoutes.getSeason1Data(req, res, app);
    });

    app.get('/season2data', function (req, res) {
        _routesMethodsExport.RoutesMethods.DataRoutes.getSeason2Data(req, res, app);
    });

    /*app.use((req, res) => {
        res.writeHead(303, {
            'Location': '/'
        });
        res.end();
        // res.send(404);
    });*/
};