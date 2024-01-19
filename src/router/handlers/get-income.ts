import { Request, Response } from 'express';
import db from '../../db';
import { Income } from '../../models/income';


export default async function (_: Request, res: Response) {
    try{
        const query = await db.query<Income>(`
        SELECT e.id, 
            e.description,
            e.amount,
            e.date, 
            c.id category_id, 
            c.name category_name 
        FROM entries e 
        LEFT JOIN categories c ON c.id = e.category_id 
        WHERE e.type = $1`, ['income']);

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