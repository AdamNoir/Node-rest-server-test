import { env } from "process";
import { envs } from "./config";
import { Server } from "./presentation";


(() => {
    main();
}) ();

async function main(){
    const server = new Server({port: envs.PORT, public_path: envs.PUBLIC_PATH});
    server.start();
}
