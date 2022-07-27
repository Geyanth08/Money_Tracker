import React, { useState } from 'react';

import { useTransactionsContext } from '../hooks/useTransactionsContext';
import './addTransaction.css';

function AddTransaction() {
  const { dispatch } = useTransactionsContext();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = { title, amount, method };

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle('');
      setAmount('');
      setMethod(null);
      setError(null);
      console.log('New Transaction', json);
      dispatch({ type: 'CREATE_TRANSACTION', payload: json });
    }
  };

  return (
    <div className="addTransaction">
      <h3>Add New Transaction 👇</h3>
      <form className="new__transaction" onSubmit={handleSubmit}>
        <div className="form__field">
          <label>Transaction Purpose</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form__field">
          <label>Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="submit"
          value={method}
          onClick={(e) => setMethod(false)}
          className="green__button">
          Cash In
        </button>
        <button
          type="submit"
          value={method}
          onClick={(e) => setMethod(true)}
          className="red__button">
          Cash Out
        </button>
      </form>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default AddTransaction;
