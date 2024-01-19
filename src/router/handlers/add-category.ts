import { Request, Response } from 'express'
import { date, number, object, string } from "yup";
import db from '../../db';

const schema = object({
    name: string().required()
})

export default async function (req: Request, res: Response) {
    try{
        const { name } = await schema.validate(req.body)
        const query = await db.query(`
            INSERT INTO categories (
                name
            ) 
            VALUES ($1)
            RETURNING id, name;
        `, [name])
        res.status(201).json(query.rows[0])
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}