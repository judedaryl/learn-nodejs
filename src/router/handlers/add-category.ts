import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import db from '../../db';

const schema = object({
    name: string().required()
})

export default async function (req: Request, res: Response) {
    const { name } = await schema.validate(req.body)
    const query = await db.query(`
        INSERT INTO categories (
            name
        ) 
        VALUES ($1)
        RETURNING id, name;
    `, [name])
    res.status(201).json(query.rows[0])
}