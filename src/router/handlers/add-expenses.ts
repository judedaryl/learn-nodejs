import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import db from '../../db';

const schema = object({
    categoryId: string().uuid().required(),
    amount: number().required().min(0, 'expense cannot be less than 0'),
    description: string().required(),
    date: date().required()
})

export default async function(req: Request, res: Response) {
    const dto = await schema.validate(req.body)
    const query = await db.query(`
        INSERT INTO expenses (
            category_id,
            description,
            amount,
            date
        )
        VALUES($1, $2, $3, $4)
        RETURNING id;
    `, [dto.categoryId, dto.description, dto.amount, dto.date.toISOString()])
    res.status(201).json(query.rows[0])
}