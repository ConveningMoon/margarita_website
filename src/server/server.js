import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { router } from '../routes/profile.routes.js';
//const express = require('express');
//const path = require('path');

//export const startServer = (options) => {
export const startServer = () => {
    //const { port, public_path } = options;
    
    //Express for middleware
    const app = express();

    //app.use(express.static(public_path));
    app.use(bodyParser.json());

    //Here we connect the database
    mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME});
    const db = mongoose.connection;

    app.use('/profiles', router);

    // app.get('*', (req, res) => {
    //     const indexPath = path.join(__dirname + `../../${public_path}/index.html`);
    //     res.sendFile(indexPath);
    // })

    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log(`Listening to the port ${port}`);
    })
}