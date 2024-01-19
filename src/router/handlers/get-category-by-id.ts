import { Request, Response } from 'express'
import db from '../../db';
import { Category } from '../../models/category';
import { object, string } from 'yup';

const pathSchema = object({
    id: string().uuid()
})

export default async function (req: Request, res: Response) {
    try {
        const { id } = await pathSchema.validate(req.params)
    
        const query = await db.query<Category>('SELECT * FROM categories WHERE id = $1', [ id ])
        if (query.rows[0]) 
            res.status(200).json(query.rows[0]!)
        else
            res.status(404).send()
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}