import express from 'express';
import usersRouter from './router/user.js';
import groupsRouter from './router/groups.js';
import expensesRouter from './router/expenses.js';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/expenses', expensesRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
