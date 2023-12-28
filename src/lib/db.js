import postgres from "postgres";
import { get_secret } from "@/lib/secrets";

const environment = process.env["NODE_ENV"];
console.log("Environment: ", environment);

let connection=null

async function prepare_config() {
  var config = {
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    database: process.env.PGSQL_DATABASE,
    ssl: false,
  };

  if (environment == "production") {
    config.ssl = { rejectUnauthorized: false };
    const secret = process.env.PGSQL_CREDENTIALS;
    const creds = await get_secret(secret, "eu-west-1");
    const creds_json = JSON.parse(creds);
    config.user = creds_json?.username ?? "";
    config.password = creds_json?.password ?? "";
  }
  return config
}

export async function get_sql() {
    if (connection==null) {
        console.debug('Creating DB connection')
        const config = await prepare_config()
        connection = postgres(config)
    }
    return connection
}


