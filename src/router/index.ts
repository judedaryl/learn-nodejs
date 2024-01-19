import express from 'express';
import { notFound, uncaughtErrors, validationErrors } from './error-handlers';

import getCategories from './handlers/get-categories';
import addCategory from './handlers/add-category';
import getCategoryById from './handlers/get-category-by-id';
import updateCategory from './handlers/update-category';
import deleteCategory from './handlers/delete-category';

import getExpenses from './handlers/get-expenses';
import getExpenseById from './handlers/get-expense-by-id';
import addExpenses from './handlers/add-expenses';
import updateExpense from './handlers/update-expense';
import deleteExpense from './handlers/delete-expense';

import getIncomes from './handlers/get-incomes';
import getIncomeById from './handlers/get-income-by-id';
import addIncome from './handlers/add-income';
import updateIncome from './handlers/update-income';
import deleteIncome from './handlers/delete-income';

import cors from 'cors';
import { json } from 'body-parser';

const router = express();
router.set('json spaces', 3);
router.use(json());
router.use(cors());

router.get('/categories', getCategories);
router.post('/categories', addCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpenseById);
router.post('/expenses', addExpenses);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

router.get('/incomes', getIncomes);
router.get('/incomes/:id', getIncomeById);
router.post('/incomes', addIncome);
router.put('/incomes/:id', updateIncome);
router.delete('/incomes/:id', deleteIncome);

router.use(uncaughtErrors);
router.use(validationErrors);
router.use(notFound);

export default router;
