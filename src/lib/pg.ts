import { config } from "config/config";
import pg_promise from "pg-promise";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";

let pg_config = config.database.postgres;

let pgp = pg_promise();
let cn: IConnectionParameters = {
    host: pg_config.host,
    port: pg_config.port,
    database: pg_config.db,
    user: pg_config.user,
    password: pg_config.password,
    max: 30,
};

let db = pgp(cn);
console.log("Connected to Postgres");

export { db };
