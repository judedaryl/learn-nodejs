import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import db from '../../db';

const schema = object({
    name: string().required()
})

const pathSchema = object({
    id: string().uuid()
})

export default async function (req: Request, res: Response) {
    const { id } = await pathSchema.validate(req.params)
    const { name } = await schema.validate(req.body)
    await db.query(`
        UPDATE categories
            SET name = $2
        WHERE
            id = $1;
    `, [id, name])
    res.status(204).send();
}