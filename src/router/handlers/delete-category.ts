import { Request, Response } from 'express'
import { object, string } from "yup";
import db from '../../db';

const pathSchema = object({
    id: string().uuid()
})

export default async function (req: Request, res: Response) {
    const { id } = await pathSchema.validate(req.params)
    await db.query(`
        DELETE FROM categories WHERE id = $1;
    `, [id])
    res.status(204).send();
}