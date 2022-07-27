import { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

export const useTransactionsContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw Error('Error in Context');
  }

  return context;
};
