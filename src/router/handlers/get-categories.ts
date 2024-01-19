import { Request, Response } from 'express'
import db from '../../db';
import { Category } from '../../models/category';


export default async function(_: Request, res: Response) {
    try{
        const query = await db.query<Category>('SELECT * FROM categories')
        res.status(200).json(query.rows)
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}