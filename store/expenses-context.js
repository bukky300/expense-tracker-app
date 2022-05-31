import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of Nike air jordans',
    amount: 534.99,
    date: new Date('2022-05-01'),
  },
  {
    id: 'e2',
    description: 'A pair of Levi jeans',
    amount: 52.99,
    date: new Date('2021-04-03'),
  },
  {
    id: 'e3',
    description: 'Rent',
    amount: 1000,
    date: new Date('2022-03-29'),
  },
  {
    id: 'e4',
    description: 'Groceries',
    amount: 190.99,
    date: new Date('2022-04-02'),
  },
  {
    id: 'e5',
    description: ' 2 Concert Tickets',
    amount: 50,
    date: new Date('2022-03-30'),
  },
  {
    id: 'e6',
    description: 'Laptop',
    amount: 400,
    date: new Date('2022-01-29'),
  },
  {
    id: 'e7',
    description: 'Flex',
    amount: 190.99,
    date: new Date('2022-04-02'),
  },
  {
    id: 'e8',
    description: 'Insurance',
    amount: 30,
    date: new Date('2022-02-20'),
  },
  {
    id: 'e9',
    description: 'Utilities',
    amount: 300,
    date: new Date('2022-04-01'),
  },
  {
    id: 'e10',
    description: 'Car Maintenance',
    amount: 170.46,
    date: new Date('2021-04-03'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id) => {},
  deleteExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
