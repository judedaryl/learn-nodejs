import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import { Income } from '../../models/income';
import db from '../../db';

const schema = object({
    categoryId: string().uuid().required(),
    amount: number().required().min(0, 'income cannot be less than 0'),
    description: string().required(),
    date: date().required()
})

export default async function(req: Request, res: Response) {
    try{
        const dto = await schema.validate(req.body)
        const query = await db.query(`
            INSERT INTO entries (
                category_id,
                description,
                amount,
                type,
                date
            )
            VALUES($1, $2, $3, 'income', $4)
            RETURNING 
                id,
                description,
                amount,
                date,
                category_id,
                (SELECT name FROM categories WHERE id = $1) AS category_name;
        `, [dto.categoryId, dto.description, dto.amount, dto.date.toISOString()]
        );
        
        const responseData = query.rows.map((entry: Income) => ({
            id: entry.id,
            description: entry.description,
            amount: Number(entry.amount),
            date: entry.date.toISOString().split('T')[0],
            category: {
                id: entry.categoryID,
                name: entry.categoryName,
            },
        }));

        res.status(201).json(responseData);
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}