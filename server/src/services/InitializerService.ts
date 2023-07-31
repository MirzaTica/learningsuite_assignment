import express, { IRouter, Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";
import { KanbanApiController } from "../controllers/KanbanApiController";
import cors from "cors";

export abstract class InitializerService {

    private static _app = express();

    private static _schema = buildSchema(readFileSync("schema.graphql", "utf8"));

    public static init(): void {
        this._app.use(cors());
        this._app.use("/graphql", graphqlHTTP(
            {
                schema: this._schema,
                rootValue: new KanbanApiController(), 
                graphiql: true
            }));
        this._app.listen(4000, () => {
            console.log('Server Started 🔥\nBrowse http://localhost:4000/graphql')
        })

    }

    public static get app() : Express.Application {
        return this._app;
    }  

}