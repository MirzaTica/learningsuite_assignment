import { PrismaClient } from "@prisma/client";

export abstract class DatabaseService {

    private static _prismma: PrismaClient = new PrismaClient();

    public static get prisma(): PrismaClient {
        return this._prismma;
    }

}
