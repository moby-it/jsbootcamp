import { bootstrap } from './bootstrap.js';

bootstrap().then((app) =>
    app.listen(4000, () => {
        console.log(`catchemall api listening on port 4000`);
    }),
);
