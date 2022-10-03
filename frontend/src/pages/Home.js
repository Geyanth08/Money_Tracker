import React, { useEffect } from 'react';

import AddTransaction from '../components/AddTransaction';
import { useTransactionsContext } from '../hooks/useTransactionsContext';
import Transaction from '../components/Transaction';
import './home.css';
import { useAuthContext } from '../hooks/useAuthContext';

function Home() {
  const { transactions, dispatch } = useTransactionsContext();
  const { user } = useAuthContext();
  // console.log(user.token);
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions', {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: json });
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [dispatch, user]);

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
