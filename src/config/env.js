import { config } from "dotenv";
// import env  from "env-var";
//require('dotenv').config();
//const { get } = require('env-var');

export const runEV = () => {
    config();
}
// export const envs = { 
//     PORT: env.get('PORT').required().asPortNumber(),
//     PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString()
// }