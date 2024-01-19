import { Request, Response } from 'express'
import db from '../../db';
import { Income } from '../../models/income';
import { object, string } from 'yup';

const pathSchema = object({
    id: string().uuid()
})

export default async function(req: Request, res: Response) {
    const { id } = await pathSchema.validate(req.params)
    
    try {
        const query = await db.query<Income>(`
        SELECT e.id, 
            e.description,
            e.amount,
            e.date, 
            c.id category_id, 
            c.name category_name 
        FROM entries e 
        LEFT JOIN categories c ON c.id = e.category_id 
        WHERE e.id = $1
        AND e.type = $2`, [ id, 'income' ]);

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
        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}