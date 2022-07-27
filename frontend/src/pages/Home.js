import React, { useEffect } from 'react';

import AddTransaction from '../components/AddTransaction';
import { useTransactionsContext } from '../hooks/useTransactionsContext';
import Transaction from '../components/Transaction';
import './home.css';

function Home() {
  const { transactions, dispatch } = useTransactionsContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: json });
      }
    };

    fetchTransactions();
  }, [dispatch]);

  return (
    <div className="home">
      <AddTransaction />
      <div className="transactions">
        {transactions &&
          transactions.map((transaction) => (
            <Transaction key={transaction._id} details={transaction} />
          ))}
      </div>
    </div>
  );
}

export default Home;
