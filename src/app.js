import { envs } from './config/env.js';
import { startServer } from './server/server.js';

const main = () => {
    console.log(`Environment variables: ${envs}`);

    console.log('\n\nPor parte del server: ');
    startServer({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })
}

(async() => {
    main()
})()