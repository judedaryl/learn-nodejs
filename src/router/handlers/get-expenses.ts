import { Request, Response } from 'express'
import db from '../../db';
import { Expense } from '../../models/expense';

export default async function(_: Request, res: Response) {
    const query = await db.query<Expense>('SELECT * FROM entries WHERE type = $1', ['expense'])
    res.status(200).json(query.rows)
}