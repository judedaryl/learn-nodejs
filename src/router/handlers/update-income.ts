import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import db from '../../db';

const schema = object({
    description: string().required(),
    categoryId: string().required(),
    amount: number().required().min(0, 'income cannot be less than 0'),
    date: date().required()
})

const pathSchema = object({
    id: string().uuid()
})

export default async function (req: Request, res: Response) {
    try{
        const { id } = await pathSchema.validate(req.params)
        const { description, categoryId, amount, date } = await schema.validate(req.body);
        await db.query(`
            UPDATE entries
            SET description = $2,
                category_id = $3,
                amount = $4,
                date = $5
            WHERE
                id = $1
        `, [id, description, categoryId, amount, date ])
        res.status(204).send();
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}