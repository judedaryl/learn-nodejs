import { Pool, QueryResultRow } from "pg";
import { Signer } from '@aws-sdk/rds-signer'
import isInLambda from "../helpers/is-in-lambda";
class Database {

    private db: Pool;

    constructor() {
        this.db = new Pool({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            ssl: false,
        })
    }

    async setupPool() {
        if(!isInLambda()) {
            console.log("only available inside a lambda")
            return;
        }
        const signer = new Signer({
            hostname: process.env.DB_HOST!,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
                sessionToken: process.env.AWS_SESSION_TOKEN!
            }
        })
        const token = await signer.getAuthToken()
        this.db = new Pool({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: token,
            ssl: true,
        })
    }

    async query<R extends QueryResultRow = any>(queryString: string, params: any[] = []) {
        const result = await this.db.query<R, any[]>(queryString, params)
        return { ...result, rows: result.rows.map<R>(val => camelCase(val)) };
    }
}
function camelCase<T>(snakeRow: Record<string, any>): T {
    const camelRow: Record<string, any> = {};
    const snakeToCamelMap: Record<string, string> = {};
    for (const [snakeColumn, columnValue] of Object.entries(snakeRow)) {
        let camelColumn = snakeToCamelMap[snakeColumn];
        if (camelColumn === undefined) {
            const words = snakeColumn.split('_');
            camelColumn =
                words[0] +
                words
                    .slice(1)
                    .map((word) =>
                        word == 'id' ? 'ID' : word[0].toUpperCase() + word.substring(1)
                    )
                    .join('');
            snakeToCamelMap[snakeColumn] = camelColumn;
        }
        camelRow[camelColumn] = columnValue;
    }
    return camelRow as T;
}


const db = new Database();
export default db;