import "./src/config"
import isInLambda from "./src/helpers/is-in-lambda";
import router from "./src/router";
import serverless from 'serverless-http/serverless-http';
import db from "./src/db";

if (!isInLambda()) {
    const port = process.env.PORT;
    router.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://+:${port}`);
    });
}

export const handler = async (ev: Object, ctx: Object) => {
    await db.setupPool();
    return serverless(router)(ev, ctx)
}