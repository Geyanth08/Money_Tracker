import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { useTransactionsContext } from '../hooks/useTransactionsContext';
import './transaction.css';

function Transaction({ details }) {
  const { dispatch } = useTransactionsContext();

  const handleClick = async () => {
    const response = await fetch('/api/transactions/' + details._id, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: json });
    }
  };

  return (
    <div className="transaction">
      {details.method ? (
        <div className="transaction__status__red" />
      ) : (
        <div className="transaction__status__green" />
      )}
      <div className="transaction__details">
        <div className="transaction__details__info">
          <h3>{details.title}</h3>
          <p>
            {formatDistanceToNow(new Date(details.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="transaction__details__amount">
          <h3>{details.amount}</h3>
          <img src="/assests/delete.png" alt="delete" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Transaction;
