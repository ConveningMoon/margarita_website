import { envs } from './config/env.js';
import { startServer } from './server/server.js';

const main = () => {
    console.log(`Environment variables: ${envs}`);

    console.log('\n\nThis came from the server: ');
    startServer({
        port: envs.PORT || 3000,
        public_path: envs.PUBLIC_PATH
    })
}

(async() => {
    main()
})()