import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Idelete } from "../category/dto/category.dto";
import { ReqParams } from "../config/network/network";

const client = new PrismaClient();
export const findVariant = async (req: ReqParams<Idelete>, res: Response, n: NextFunction) => {
    const data = await client.variant.findUnique({
        where: { id: req.params.id }
    });

    if (data) {
        return n();
    }
    return res.status(404).json({ msg: "Sorry! but variant not found." });
};
