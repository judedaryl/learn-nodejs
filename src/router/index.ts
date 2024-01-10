import express from 'express'
import { notFound, uncaughtErrors, validationErrors } from './error-handlers';
import addExpenses from './handlers/add-expenses';
import getCategories from './handlers/get-categories';
import cors from 'cors'
import addCategory from './handlers/add-category';
import updateCategory from './handlers/update-category';
import getCategoryById from './handlers/get-category-by-id';
import deleteCategory from './handlers/delete-category';
import { json } from 'body-parser';

const router = express();
router.set('json spaces', 3)
router.use(json())
router.use(cors())

router.get('/categories', getCategories)
router.post('/categories', addCategory)
router.get('/categories/:id', getCategoryById)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

router.post('/expenses', addExpenses)

router.use(uncaughtErrors)
router.use(validationErrors)
router.use(notFound)
export default router;