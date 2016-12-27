"use strict"

import express from 'express';

import path from 'path';
import Promise from 'promise';

import {
    RoutesMethods
} from './routesMethodsExport.js';



export const routes = (app) => {

    app.get('/', (req, res) => {
        RoutesMethods.PagesRoutes.mainPage(req, res, app);
    });

    app.get('/season1', (req, res) => {
        RoutesMethods.PagesRoutes.season1Page(req, res, app);
    });

    app.get('/season2', (req, res) => {
        RoutesMethods.PagesRoutes.season2Page(req, res, app);
    });

    app.get('/season1data', (req, res) => {
        RoutesMethods.DataRoutes.getSeason1Data(req, res, app);
    });

    app.get('/season2data', (req, res) => {
        RoutesMethods.DataRoutes.getSeason2Data(req, res, app);
    });

    /*app.use('*', (req, res) => {
        res.writeHead(303, {
            'Location': '/'
        });
        res.end();
    });*/

}