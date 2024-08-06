import { runEV } from './config/env.js';
import { startServer } from './server/server.js';

const main = () => {
    //console.log(`Environment variables: ${envs}`);
    console.log("Loading EV...");
    runEV();
    console.log("EV Done.\n")

    console.log("Loading server...");
    startServer();
    console.log('Server is running.\n');
    // startServer({
    //     port: envs.PORT,
    //     public_path: envs.PUBLIC_PATH
    // })    
}

(async() => {
    main()
})()