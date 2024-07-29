//ES6
import { test } from "./functions.js";
//Set port
import { config } from "dotenv";
//Library to set EV as required
import env from 'env-var';
//Con legacy
// const test_import = require('./functions.js');

//Call config to set environment variables
config();

const PORT = env.get('PORT').required().asPortNumber()

console.log(test());

console.log(PORT);
console.log(process.env.PORT);