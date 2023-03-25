import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Idelete } from "./dto/category.dto";

const client = new PrismaClient();
export const findCategory = async (req: Request<Idelete>, res: Response, n: NextFunction) => {
    const find = await client.category.findUnique({
        where: { id: req.params.id }
    });

    if (find) {
        return n();
    }
    return res.status(404).json({
        msg: "category not found."
    });
};
