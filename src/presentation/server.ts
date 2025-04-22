import express from 'express';
import { Router } from 'express';

interface Options {
    port: number,
    public_path?: string,
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const {port, public_path = 'public', routes} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        // MIDELWARES
        /**Aqui estamos definiendo que cada ruta que se use pase por aqui.
         * Asi estamos preparados para usar JSON o x-www-form...
         */
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        /**Routes */
        /**Hacemos uso de los Middelwere que son funciones que se ejecutan en las rutas...
         * aqui usamos una para usar las rutas de la app.
         * 
         * Esto parq que el server haga aqui sus configuraciones y no se llene de rutas
         */
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running with express in port ${this.port}`)
        })
    }
}
