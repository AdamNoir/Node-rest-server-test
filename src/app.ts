import { envs } from './config';
import { Server, AppRoutes } from './presentation';

(() => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}
